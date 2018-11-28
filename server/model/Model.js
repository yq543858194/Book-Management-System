const Sequelize = require('sequelize');
const connector = require('../config/config.js');

const User = connector.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  school: {
    type: Sequelize.STRING,
    allowNull: false
  },
  work: {
    type: Sequelize.STRING,
    allowNull: false
  },
  avatar: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  adminCode: {
    type: Sequelize.STRING,
    allowNull: false
  }
},{
  underscored: true
});

const Book = connector.define('book', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ISBN: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  count: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

const Notify = connector.define('notify', {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

Notify.belongsTo(User);

connector.sync({force: false}).then(() => {
  console.log('database sync success');
}).catch((err) => {
  console.log('database sync fail:' + err);
})

module.exports = {
  User,
  Book,
  Notify
};
