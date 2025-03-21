import { useReducer, useState } from 'react'


function App() {

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const [cartProducts, dispatchCartProducts] = useReducer(cartReducer, [])

  function cartReducer(state, action) {
    console.log('state', state);
    console.log('action', action);

    switch (action.type) {
      case 'ADD_ITEM':
        // Logica per aggiungere un prodotto
        if (!state.find(p => p.name === action.prodotto.name)) {
          return ([...state, { name: action.prodotto.name, price: action.prodotto.price, quantity: 1 }])
        }
        else {
          dispatchCartProducts({ type: 'UPDATE_QUANTITY', index: action.index, numberToAdd: 1 })
        }
        break;
      case 'REMOVE_ITEM':
        // Logica per rimuovere un prodotto
        return state.filter((p, index) => action.i !== index)
      case 'UPDATE_QUANTITY':
        // Logica per aggiornare la quantità
        return (state.map((prod, i) =>
          (action.numberToAdd === 1) ?
            (i === action.index) ? { ...prod, quantity: prod.quantity + action.numberToAdd } : prod
            : (i === action.index) ? { ...prod, quantity: prod.quantity = action.numberToAdd } : prod

        ))
      default:
        return state;
    }
  }

  return (
    <>
      <section className='product-list'>
        {products.map((p, i) => {
          return (
            <div key={i}>
              <p>{p.name} ({p.price.toFixed(2)}$)</p>
              <button
                onClick={() => dispatchCartProducts({ type: 'ADD_ITEM', prodotto: p, index: i })}>
                Aggiungi al carrello
              </button>
            </div>)
        })}
      </section>
      <section className='product-cart'>
        {cartProducts && cartProducts.map((p, i) => {
          return (
            <div key={i}>
              <p>Nome: {p.name}</p>
              <p>Prezzo: {p.price.toFixed(2)}$</p>
              <div>
                <label htmlFor="quantity">Inseritisci quantità</label>
                <input
                  type="number"
                  name="quantity"
                  id='quantity'
                  value={p.quantity}
                  onChange={(e) => dispatchCartProducts({ type: 'UPDATE_QUANTITY', index: i, numberToAdd: e.target.value })} />
              </div>
              <button
                onClick={() => dispatchCartProducts({ type: 'REMOVE_ITEM', i })}>
                Rimuovi dal carrello
              </button>
            </div>)
        })}
      </section>
      <h4>Totale</h4>
      <div>
        {cartProducts && cartProducts.reduce((acc, product) => {
          return acc + product.price * product.quantity;
        }, 0)} $
      </div>

    </>
  )
}

export default App
