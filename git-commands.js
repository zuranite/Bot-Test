
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function executeCommand(command) {
  try {
    const output = execSync(command, { encoding: 'utf8' });
    console.log(output);
    return true;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return false;
  }
}

function showMenu() {
  console.log('\n--- Git Commands Menu ---');
  console.log('1. Check status');
  console.log('2. Add all changes');
  console.log('3. Commit changes');
  console.log('4. Push to GitHub');
  console.log('5. Pull from GitHub');
  console.log('6. View commit history');
  console.log('7. Create a new branch');
  console.log('8. Switch branch');
  console.log('9. Exit');
  
  rl.question('\nEnter your choice (1-9): ', (choice) => {
    switch(choice) {
      case '1':
        executeCommand('git status');
        showMenu();
        break;
      case '2':
        executeCommand('git add .');
        console.log('All changes staged for commit.');
        showMenu();
        break;
      case '3':
        rl.question('Enter commit message: ', (message) => {
          // Check if there are any changes to commit
          const statusOutput = execSync('git status --porcelain', { encoding: 'utf8' });
          if (!statusOutput.trim()) {
            console.log('No changes to commit. Working tree clean.');
          } else {
            executeCommand(`git commit -m "${message}"`);
          }
          showMenu();
        });
        break;
      case '4':
        // Get the current branch
        const currentBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
        rl.question('Enter your GitHub username: ', (username) => {
          rl.question('Enter your GitHub personal access token: ', (token) => {
            // Get remote URL without credentials
            const remoteUrl = execSync('git config --get remote.origin.url', { encoding: 'utf8' }).trim();
            // Extract repo path from URL
            const repoPath = remoteUrl.replace(/^https:\/\/github\.com\//, '').replace(/^git@github\.com:/, '');
            
            const repoUrl = `https://${username}:${token}@github.com/${repoPath}`;
            executeCommand(`git push ${repoUrl} ${currentBranch}`);
            showMenu();
          });
        });
        break;
      case '5':
        // Get the current branch
        const pullBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
        executeCommand(`git pull origin ${pullBranch}`);
        showMenu();
        break;
      case '6':
        executeCommand('git log --oneline -n 10');
        showMenu();
        break;
      case '7':
        rl.question('Enter new branch name: ', (branchName) => {
          executeCommand(`git checkout -b ${branchName}`);
          showMenu();
        });
        break;
      case '8':
        executeCommand('git branch');
        rl.question('Enter branch name to switch to: ', (branchName) => {
          executeCommand(`git checkout ${branchName}`);
          showMenu();
        });
        break;
      case '9':
        console.log('Exiting...');
        rl.close();
        break;
      default:
        console.log('Invalid choice, please try again.');
        showMenu();
    }
  });
}

console.log('Welcome to Git Helper for your Discord Bot Project!');
showMenu();
