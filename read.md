echo "# reform_old_project" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/demong89/reform_old_project.git
git push -u origin main
