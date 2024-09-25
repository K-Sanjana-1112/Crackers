const Cart=require('../Models/cartModel')


 createCart=async (req, res) => {
    const { username, product } = req.body;

  
      let cart = await Cart.findOne({ username });
   
      if (!cart) {
        cart = new Cart({ username, items: [product] });
      } else {
        const existingItemIndex = cart.items.findIndex(item => item.title === product.title);
        if (existingItemIndex !== -1) {
          cart.items[existingItemIndex].quantity += product.quantity;
        } else {
            cart.items.push(product);
          
        }
      }
   
      await cart.save();
      res.status(200).send({message:"Added to cart"})
}

getCart = async (req, res) => {
    const username= req.params.username;
   
    
   const cart = await Cart.findOne({ username:username });
  
      res.status(200).send({message:"Product",payload:cart});
     
     
    
}


deleteCart=async (req, res) => {
  const  username= req.params.username;

  
 let index=req.params.index

 let cartData= await Cart.findOne({username:username})

  cartData.items.splice(index,1)

  let updatedCart=await Cart.findOneAndUpdate({username:username},cartData)

  res.status(200).send({message:" Updated Cart" ,payload:updatedCart})
 
 
 
}
const increment = async (req, res) => {
  
  const username = req.params.username;
  const index = parseInt(req.params.index);
 
  // Find the user's cart
  const cart = await Cart.findOne({ username });

  if (!cart) {
    return res.status(404).send({ message: 'Cart not found' });
  }

  // Ensure the index is valid
  if (index < 0 || index >= cart.items.length) {
    return res.status(400).send({ message: 'Invalid item index' });
  }

  // Increment the quantity of the item at the specified index
  cart.items[index].quantity++;

  // Save the updated cart
  await cart.save();

  

  res.Status(200).send({ message: 'Item quantity incremented successfully' });

}


const decrement= async (req, res) => {
   
  const username = req.params.username;
  const index = parseInt(req.params.index);
  
  
  // Find the user's cart
  const cart = await Cart.findOne({ username });

  if (!cart) {
    return res.status(404).send({ message: 'Cart not found' });
  }

  // Ensure the index is valid
  if (index < 0 || index >= cart.items.length) {
    return res.status(400).send({ message: 'Invalid item index' });
  }

  // Decrement the quantity of the item at the specified index
  if (cart.items[index].quantity > 1) {
    cart.items[index].quantity--;
  }

  // Save the updated cart
  await cart.save();

  res.status(200).send({ message: 'Item quantity decremented successfully' });

};



  module.exports={createCart,getCart,deleteCart,decrement,increment}
   