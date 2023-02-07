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
 