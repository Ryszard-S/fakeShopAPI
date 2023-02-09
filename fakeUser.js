const { faker } = require('@faker-js/faker')
const firstName = faker.name.firstName()
const lastName = faker.name.lastName()
const email = faker.internet.email()
const password = faker.internet.password()
const username = faker.internet.userName()
// generate fake brand name
const brand = faker.company.companyName()

console.log({ username, name: firstName, lastName, password, email })
console.log({ brand })

let dd = new Date('2023-02-09T14:10:56.940Z').toLocaleString()
console.log(dd)
