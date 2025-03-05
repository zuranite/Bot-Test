const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Git Configuration Helper');

rl.question('Enter your Git username: ', (username) => {
  execSync(`git config --global user.name "${username}"`, { encoding: 'utf8' });

  rl.question('Enter your Git email: ', (email) => {
    execSync(`git config --global user.email "${email}"`, { encoding: 'utf8' });

    rl.question('Enter your GitHub repository URL (e.g., https://github.com/username/repo.git): ', (repoUrl) => {
      try {
        // Check if git is initialized
        try {
          execSync('git rev-parse --is-inside-work-tree', { encoding: 'utf8' });
          console.log('Git repository already initialized.');
        } catch (error) {
          console.log('Initializing git repository...');
          execSync('git init', { encoding: 'utf8' });
        }

        // Set the remote origin
        try {
          execSync('git remote -v', { encoding: 'utf8' });
          execSync(`git remote set-url origin ${repoUrl}`, { encoding: 'utf8' });
        } catch (error) {
          execSync(`git remote add origin ${repoUrl}`, { encoding: 'utf8' });
        }

        console.log('Git configuration completed successfully!');
      } catch (error) {
        console.error(`Error configuring git: ${error.message}`);
      }

      rl.close();
    });
  });
});