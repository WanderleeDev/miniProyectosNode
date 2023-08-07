import { createInterface} from 'readline'
import chalk from 'chalk'
import fse from 'fs-extra'
import imagemin from 'imagemin'
import imageminJpegtran from 'imagemin-jpegtran'
import imageminSvgo from 'imagemin-svgo'
import imageminWebp from 'imagemin-webp'
import imageminGifsicle from 'imagemin-gifsicle'
import sharp from 'sharp'
import imageminPngquant from 'imagemin-pngquant'

const folderFuente  = "./optiPicCli/src";
const folderFinal = "./optiPicCli/opt";
const infoWidth = [
  { Uso: 'Íconos pequeños', Rango: '16 - 32 píxeles' },
  { Uso: 'Miniaturas de galería', Rango: '100 - 300 píxeles' },
  { Uso: 'Imágenes en redes sociales', Rango: '1200 - 1800 píxeles' },
  { Uso: 'Ancho de contenido principal', Rango: '800 - 1200 píxeles' },
  { Uso: 'Imágenes de ancho completo', Rango: '1600 - 2400 píxeles' }
]; 
const rl = createInterface({
  input: process.stdin,
  output: process.stdout
})

const interfazCli = () => {
  console.log(chalk.blueBright('Optimizados de imágenes \nTabla de referencias o recomendaciones\n'));
  console.table(infoWidth)
}

const procesarCarpetas = async(newWidth) => {
  try {
    const files = await fse.readdir(folderFuente)

    for (const file of files) {
      //ruta de entrada
      let inputPath = `${folderFuente}/${file}`
      //ruta de salida
      let outputPath = `${folderFinal}/${file}`

      await sharp(inputPath).resize(newWidth).toFile(outputPath)
      await imagemin([outputPath], {
        destination:folderFinal,
        plugins: [
          //  comprime una imagen con calidad del 80%
          imageminJpegtran({ quality: 80 }),
          // Comprime imagen PNG
          imageminPngquant(),
          //  comprime imagen svg
          imageminSvgo(),
          //  Comprime imagen webP
          imageminWebp({ quality: 80 }),
          //   comprime gif
          imageminGifsicle()
        ]
      })
      console.log(chalk.green(`Imagen procesada: ${inputPath}`));
    }
    console.log(chalk.green.bold('Todas las imágenes han sido procesadas'));
  } catch (error) {
    console.log(error);
  }
}

const formatImage = () => {
  rl.question(
    chalk.blueBright(`Ingresa un ancho deseado >`),
    (width) => {
      const widthFormat = Number(width)
      if (isNaN(widthFormat) || widthFormat <= 0) {
        console.log(chalk.red('Ingrese solo un valor numérico'))
        formatImage()
      }
      procesarCarpetas(widthFormat)
      rl.close()
  })
}

//Despliega la interfaz cli del conversor
interfazCli()
//  Pide una medida y ejecuta la conversión
formatImage()
