const db = {
  products: [
    { id: 1, name: 'laptop', price: 899, userId: 1 },
    { id: 2, name: 'tablet', price: 399, userId: 1 },
    { id: 3, name: 'desktop', price: 799, userId: 2 },
    { id: 4, name: 'smartphone', price: 999, userId: 2 },
  ]
}

const products = {}

products.getOne = function(id){
  return db.products.find(p => p.id === id)
}

products.getMany = function(params){
  return db.products
}

products.create = function(params){
  db.products.push({
    name: params.name,
    price: params.price,
    userId: 3,
  })
}

products.update = function(id, params){
  const item = this.getOne(id)
  item.name = params.name
  item.price = params.price
  return item
}

products.delete = function(id){
  db.products = db.products.filter(p => p.id !== id)
  return db.products
}

module.exports = products;