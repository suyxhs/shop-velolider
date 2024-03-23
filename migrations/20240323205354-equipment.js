/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker')

const getRandomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)]
const brand = [
  'GIANT',
  'TECH TEAM',
  'TRIX',
  'AUTHOR',
  'BLACK TOOLS',
  'CHIBA',
  'FUJI',
]
const colors = ['Фиолетовый', 'Жёлтый', 'Оранжевый', 'Чёрный', 'Белый']
const equipmentTypes = ['Велоперчатки', 'Велошлемы', 'Велоочки', 'Велорюкзаки']
const images = [
  '/img/equipment/equipment-Велорюкзаки.png',
  '/img/equipment/equipment-Велоочки-1.png',
  '/img/equipment/equipment-Велоочки-2.png',
  '/img/equipment/equipment-Велоперчатки-1.png',
  '/img/equipment/equipment-Велоперчатки-2.png',
  '/img/equipment/equipment-Велошлемы.png',
]

module.exports = {
  async up(db) {
    return db.collection('equipment').insertMany(
      [...Array(50)].map(() => {
        const type =
          equipmentTypes[Math.floor(Math.random() * equipmentTypes.length)]
        const characteristics = [
          {
            type: 'Велоперчатки',
            color: getRandomArrayValue(colors),
            brand: getRandomArrayValue(brand),
          },
          {
            type: 'Велошлемы',
            color: getRandomArrayValue(colors),
            brand: getRandomArrayValue(brand),
          },
          {
            type: 'Велоочки',
            color: getRandomArrayValue(colors),
            brand: getRandomArrayValue(brand),
          },
          {
            type: 'Велорюкзаки',
            color: getRandomArrayValue(colors),
            brand: getRandomArrayValue(brand),
          },
        ]

        return {
          category: 'equipment',
          type,
          price: +faker.string.numeric(4).replace(/.(0,2)$/, 99),
          name: faker.lorem.sentence(2),
          description: faker.lorem.sentences(10),
          characteristics: characteristics.find((item) => item.type === type),
          images: images.filter((item) => item.includes(type)),
          vendorCode: faker.string.numeric(4),
          inStock: faker.string.numeric(2),
          isBestseller: faker.datatype.boolean(),
          isNew: faker.datatype.boolean(),
          popularity: +faker.string.numeric(3),
          sizes:
            type === 'Велоперчатки'
              ? {
                m: faker.datatype.boolean(),
                s: faker.datatype.boolean(),
                l: faker.datatype.boolean(),
                xs: faker.datatype.boolean(),
                xl: faker.datatype.boolean(),
                xxl: faker.datatype.boolean(),
              }
              : {},
        }
      })
    )
  },

  async down(db) {
    return db.collection('equipment').updateMany([])
  },
}
