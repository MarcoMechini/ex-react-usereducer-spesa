import { useReducer, useState } from 'react'


function App() {
  const [count, setCount] = useState(0)

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  // const [cartProducts, dispatchCartProducts] = useReducer(cartReducer, products)
  const [addedProducts, setAddedProducts] = useState([])

  function cartReducer(state, action) {
    switch (action.type) {
      case 'ADD_ITEM':
        // Logica per aggiungere un prodotto
        break;
      case 'REMOVE_ITEM':
        // Logica per rimuovere un prodotto
        break;
      case 'UPDATE_QUANTITY':
        // Logica per aggiornare la quantità
        break;
      default:
        return state;
    }
  }

  const removeFromCart = (i) => {
    // dispatchCartProducts({type: 'REMOVE_ITEM', index: i})
    const filtered = addedProducts.filter((p, index) => i !== index)
    setAddedProducts(filtered)
  }

  const updateProductQuantity = (index, numberToAdd = 1) => {
    setAddedProducts(prevProd =>
      prevProd.map((prod, i) =>
        (numberToAdd === 1) ?
          (i === index) ? { ...prod, quantity: prod.quantity + numberToAdd } : prod
          : (i === index) ? { ...prod, quantity: prod.quantity = numberToAdd } : prod

      ))
  }


  const addToCart = (prodotto, index) => {
    if (!addedProducts.find(p => p.name === prodotto.name)) {
      setAddedProducts([...addedProducts, { name: prodotto.name, price: prodotto.price, quantity: 1 }])
    } else {
      // salvo in addedProducts un nuovo array modificato con map dove ho trovato corrispondenza tra gli indici faccio quantità + 1 sennò ritorno solo la quantità
      updateProductQuantity(index);
    }
  }

  return (
    <>
      <ul>
        {products.map((p, i) => {
          return (
            <li key={i}>
              <p>{p.name}</p>
              <p>{p.price}</p>
              <button onClick={() => addToCart(p, i)}>Aggiungi al carrello</button>
            </li>)
        })}
      </ul>
      <ul>
        {addedProducts && addedProducts.map((p, i) => {
          return (
            <li key={i}>
              <p>Nome: {p.name}</p>
              <p>Prezzo: {p.price}$</p>
              <div>
                <label htmlFor="quantity">Inseritisci quantità</label>
                <input type="number" name="quantity" id='quantity' value={p.quantity} onChange={(e) => updateProductQuantity(i, e.target.value)} />
              </div>
              <button onClick={() => removeFromCart(i)}>Rimuovi dal carrello</button>
            </li>)
        })}
      </ul>
      <h4>Totale</h4>
      <div>
        {addedProducts && addedProducts.reduce((acc, product) => {
          return acc + product.price * product.quantity;
        }, 0)} $
      </div>

    </>
  )
}

export default App
