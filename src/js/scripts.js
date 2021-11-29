//
// Scripts
//

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
         if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
             document.body.classList.toggle('sb-sidenav-toggled');
         }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});
var browserSync = require('browser-sync').create();

module.exports = function(gulp, plugins) {

    return function() {

        return gulp.src([
            'src/js/plugins/**',
            'src/js/app.js',
            '!src/js/{libraries,libraries/**}'
        ])
        .pipe(plugins.plumber({
            errorHandler: function(error) {
            console.log(error.message);
            this.emit('end');
        }}))
        .pipe(plugins.concat('app.js'))
        .pipe(gulp.dest('dist/js/'))
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(plugins.uglify({
            preserveComments: 'none'
            //preserveComments: 'some'
        }))
        .pipe(gulp.dest('dist/js/')) // Seems okay up until here...
        .pipe(browserSync.reload({   // ...but this never seems to fire!
            stream: true
        }));

    };

};
