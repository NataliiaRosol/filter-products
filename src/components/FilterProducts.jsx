import { useState, useEffect } from "react";
import './filter.css'

export default function FilterProducts(){

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [fileteredItems, setFilteredItems] = useState([]);

  async function fetchProducts(){

    try {
      setLoading(true);
      const response = await fetch('https://dummyjson.com/products?limit=50', {
        method: 'GET'
      });
      const result = await response.json();      

      if(result && result.products && result.products.length > 0){
        setLoading(false);
        setProducts(result.products);
        setFilteredItems(result.products)
      }
      
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    
  }

  useEffect(()=>{
    fetchProducts();
  }, []);
  

  useEffect(()=>{
    const copyProducts = [...products];
    
    setFilteredItems(
      selectedCategory !== '' ? copyProducts.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase())
        //)
      : copyProducts
    )

  }, [selectedCategory])

  const uniqueCategories = products && products.length > 0 ? 
      [...new Set(products.map(item => item.category))]
      : [];

  if (loading){
    return <h3>Fetching the products, please wait..</h3>
  }

  
  return <div className="filter-products-container">
    <h1 className="filter-products-title">Filter products by category</h1>
    <div className="filter-catogories-container">
      {
        uniqueCategories.map((category, index) => (
          <button key={index} onClick={()=> setSelectedCategory(selectedCategory !== '' && selectedCategory === category ? '' : category)}>{category}</button>
        ))
      }
    </div>

    
    <ul className="list-of-products">
      {
        fileteredItems && fileteredItems.length > 0 ? 
        fileteredItems.map(productItem => <li className="list-item" key={productItem.id}>
          <p className="list-item-title">{productItem.title}</p>
          <div>Category: <span className="product-category">{productItem.category}</span></div>
          
        </li> )
        : null
      }
    </ul>
  </div>
}