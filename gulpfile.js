
const { src, dest, watch, series, parallel }= require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer')

const imagemin = require('gulp-imagemin')

function css(done){
  //compilar sass
  //pasos: 1- identificar archivo, 2- compilarla, 3- guardar el .css

  src('./src/scss/app.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest('build/css'))

  done()
}

function imagenes(done) {
  src('./src/img/**/*')
    .pipe(dest('./build/img'));

    done();
}

function dev(){

  watch('src/scss/**/*.scss', css);
  // watch('./src/scss/app.scss', css)

  watch('./src/img/**/*, imagenes ');
}


exports.css = css;

exports.dev = dev;

exports.imagenes = imagenes

exports.default = series (imagenes, css, dev );

//series -

//parallel
