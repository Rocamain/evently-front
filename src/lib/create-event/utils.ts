import sharp from 'sharp'

export const processFiles = async (
  files: File[],
  { main, secondary }: { main: [number, number]; secondary?: [number, number] },
) => {
  return await Promise.all(
    files.map(async (file, index) => {
      const buffer = await file.arrayBuffer()
      const isMainPicture = index === 0
      let width = main[0]
      let height = main[0]
      if (secondary) {
        width = isMainPicture ? main[0] : secondary[0]
        height = isMainPicture ? main[0] : secondary[0]
      }
      const resizedBuffer = await sharp(Buffer.from(buffer))
        .withMetadata()
        .resize(width, height, {
          kernel: sharp.kernel.cubic,
          fit: 'cover',
        })
        .webp({ quality: 100 })
        .toBuffer()

      return new File([resizedBuffer], `${file.name.split('.')[0]}.webp`, {
        type: 'image/webp',
      })
    }),
  )
}
