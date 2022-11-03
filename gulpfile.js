
const { src, dest, watch, series, parallel }= require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done){
  //compilar sass
  //pasos: 1- identificar archivo, 2- compilarla, 3- guardar el .css

  src('./src/scss/app.scss')
<<<<<<< HEAD
    .pipe(sass({outputStyle: 'expanded'}))
=======
    .pipe(sass())
>>>>>>> header
    .pipe(postcss([autoprefixer()]))
    .pipe(dest('build/css'))

  done()
<<<<<<< HEAD
=======
}

function imagenes( ) {
  return src('./src/img/**/*')
    .pipe(imagemin({ optimizationLevel: 3 }) )
    .pipe(dest('./build/img'))
  
}

function versionwebp(){
  const opciones ={
    quality:50
  }
  return src('./src/img/**/*.{npg,jpg}')
    .pipe(webp(opciones))
    .pipe(dest('./build/img'))

}

function versionavif(){
  const opciones ={
    quality:50
  }

  return src('./src/img/**/*.{npg,jpg}')
    .pipe(avif(opciones))
    .pipe(dest('./build/img'))
>>>>>>> header
}

function dev(){

  watch('src/scss/**/*.scss', css);
  // watch('./src/scss/app.scss', css)

  watch('./src/img/**/*', imagenes );
}


exports.css = css;

exports.dev = dev;

exports.imagenes = imagenes;

exports.versionwebp = versionwebp;

exports.versionavif = versionavif;

exports.default = series (imagenes, versionwebp, versionavif, css, dev );

//series -

//parallel
