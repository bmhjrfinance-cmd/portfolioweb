import fs from 'fs';
import path from 'path';
import git from 'isomorphic-git';

async function main() {
  const dir = path.resolve('.');
  console.log('Initializing git repository in:', dir);

  await git.init({ fs, dir, defaultBranch: 'main' });
  console.log('Git repo initialized with default branch main!');

  // Read .gitignore patterns
  const gitignore = fs.readFileSync(path.join(dir, '.gitignore'), 'utf8')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#'));

  function isIgnored(relPath) {
    const parts = relPath.split(/[\\/]/);
    for (const pat of gitignore) {
      if (parts.includes(pat) || parts[0] === pat) return true;
    }
    if (parts.includes('.git')) return true;
    return false;
  }

  function getFiles(currentDir, baseDir = '') {
    let results = [];
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const rel = path.join(baseDir, entry.name).replace(/\\/g, '/');
      if (isIgnored(rel)) continue;
      const full = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        results = results.concat(getFiles(full, rel));
      } else {
        results.push(rel);
      }
    }
    return results;
  }

  const filesToStage = getFiles(dir);
  console.log(`Found ${filesToStage.length} files to stage...`);

  for (const filepath of filesToStage) {
    await git.add({ fs, dir, filepath });
  }
  console.log('All files staged in git index!');

  const sha = await git.commit({
    fs,
    dir,
    message: 'Initial commit: 3D Web Developer portfolio with smooth scroll animation and GitHub Pages workflow',
    author: {
      name: 'Blessing Moses Junior',
      email: 'bmhjrfinance@gmail.com'
    }
  });

  console.log(`Committed successfully! Commit SHA: ${sha}`);
  console.log('Branch: main');
}

main().catch(err => {
  console.error('Git init failed:', err);
  process.exit(1);
});
