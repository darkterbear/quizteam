if [[ $UID != 0 ]]; then
    echo "Please run this script with sudo:"
    echo "sudo $0 $*"
    exit 1
fi
cd ..
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update

sudo apt-get install -y mongodb-org
sudo systemctl start mongod

yes | sudo apt-get install nodejs-legacy

yes | sudo apt-get install npm
npm config set registry="http://registry.npmjs.org/"
sudo npm cache clean -f

sudo npm install n -g
sudo n stable

sudo npm cache clean -f
sudo npm install pm2 -g

cd quizteam-app
sudo npm install
cd ..
sudo cd quizteam-backend
sudo npm install
