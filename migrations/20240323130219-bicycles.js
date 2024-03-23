// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker')

const getRandomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)]

const collections = [
  'Велосипеды',
  'Самокаты',
  'Тренажёры',
  'Велозапчасти',
  'Велозапчасти BMX',
]
const colors = ['Фиолетовый', 'Жёлтый', 'Оранжевый', 'Чёрный', 'Белый']
const compositions = ['Сталь', 'Алюминий']
const bicycleTypes = ['Беговелы', 'Детские', 'Подростковые', 'Горные']
const images = [
  '/img/bicycles/bicycle-Беговелы-1.png',
  '/img/bicycles/bicycle-Беговелы-2.png',
  '/img/bicycles/bicycle-Горные-1.png',
  '/img/bicycles/bicycle-Горные-2.png',
  '/img/bicycles/bicycle-Детские-1.png',
  '/img/bicycles/bicycle-Детские-2.png',
  '/img/bicycles/bicycle-Подростковые-1.png',
  '/img/bicycles/bicycle-Подростковые-2.png',
]
const lineImages = [
  '/img/black-t.png',
  '/img/orange-t.png',
  '/img/violet-t.png',
]
const frameMaterial = ['Сталь', 'Алюминий', 'Карбон', 'Магниевый сплав']
const bicycleSize = [
  'one size',
  '8,5"',
  '9,5"',
  '10"',
  '10,5"',
  '11"',
  '11,5"',
  '12"',
  '13"',
  '13,5"',
]
const bikeSpeeds = ['-', '1', '6', '7', '8', '9', '10', '11', '12', '16']
const bicycleWheelDiameter = [
  '10/8',
  '12',
  '14',
  '16',
  '18',
  '20',
  '24',
  '26',
  '27.5',
  '28',
]

module.exports = {
  async up(db) {
    return db.collection('bicycles').insertMany(
      [...Array(50)].map(() => {
        const type =
          bicycleTypes[Math.floor(Math.random() * bicycleTypes.length)]
        const characteristics = [
          {
            type: 'Беговелы',
            color: getRandomArrayValue(colors),
            compositions: getRandomArrayValue(compositions),
            collections:
              collections[Math.floor(Math.random() * collections.length)],
            frameMaterial: getRandomArrayValue(frameMaterial),
            bicycleSize: '4,5"',
            bicycleWheelDiameter: '12',
          },
          {
            type: 'Детские',
            color: getRandomArrayValue(colors),
            compositions: getRandomArrayValue(compositions),
            collections:
              collections[Math.floor(Math.random() * collections.length)],
            frameMaterial: getRandomArrayValue(frameMaterial),
            bikeSpeeds: getRandomArrayValue(bikeSpeeds),
            bicycleWheelDiameter: getRandomArrayValue(bicycleWheelDiameter),
          },
          {
            type: 'Подростковые',
            color: getRandomArrayValue(colors),
            compositions: getRandomArrayValue(compositions),
            collections:
              collections[Math.floor(Math.random() * collections.length)],
            frameMaterial: getRandomArrayValue(frameMaterial),
            bikeSpeeds: getRandomArrayValue(bikeSpeeds),
            bicycleWheelDiameter: '24',
            bicycleSize: getRandomArrayValue(bicycleSize),
          },
          {
            type: 'Горные',
            color: getRandomArrayValue(colors),
            compositions: getRandomArrayValue(compositions),
            collections:
              collections[Math.floor(Math.random() * collections.length)],
            frameMaterial: getRandomArrayValue(frameMaterial),
            bikeSpeeds: getRandomArrayValue(bikeSpeeds),
            bicycleWheelDiameter: '24',
            bicycleSize: getRandomArrayValue(bicycleSize),
          },
        ]
        const currentCharacteristics = characteristics.find(
          (item) => item.type === type
        )

        return {
          category: 'bicycles',
          type,
          price: +faker.string.numeric(4).replace(/.(0,2)$/, 99),
          name: faker.lorem.sentence(2),
          description: faker.lorem.sentences(10),
          characteristics: currentCharacteristics,
          images:
            type === 'Беговелы' && currentCharacteristics.collection === 'line'
              ? [getRandomArrayValue(lineImages)]
              : images.filter((item) => item.includes(type)),
          vendorCode: faker.string.numeric(4),
          inStock: faker.string.numeric(2),
          isBestseller: faker.datatype.boolean(),
          isNew: faker.datatype.boolean(),
          popularity: +faker.string.numeric(3),
        }
      })
    )
  },

  async down(db) {
    return db.collection('bicycles').updateMany([])
  },
}
