
module.exports = (env, argv) => {
  return require('./config/' + argv.mode + '.js')();
};