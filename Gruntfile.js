module.exports = function(grunt) {

  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
 
      shell: {
        'build-jsx': {
          command: 'jsx --no-cache-dir -x jsx jsx/ js/',
          stdout: true,
          failOnError: true
        }
      },

      watch: {
        scripts: {
          files: ['jsx/*.jsx'],
          tasks: ['jsx'],
          options: {
            spawn: false,
          },
        }
      }
  });
 
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');
 
  grunt.registerTask('jsx', [
    'shell:build-jsx'
  ]);
};