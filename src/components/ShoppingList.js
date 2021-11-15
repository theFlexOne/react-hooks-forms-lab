import React, { useState } from 'react';
import ItemForm from './ItemForm';
import Filter from './Filter';
import Item from './Item';

function ShoppingList({ items }) {
  const [currentItems, setCurrentItems] = useState(items);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchFilter, setSearchFilter] = useState('');

  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = e => {
    setSearchFilter(e.target.value);
  };

  const handleItemFormSubmit = newItem => {
    setCurrentItems([...currentItems, newItem]);
  };

  const itemsToDisplay = currentItems.filter(item => {
    if (selectedCategory === 'All' && searchFilter === '') return true;
    if (selectedCategory === 'All')
      return item.name.toLowerCase().includes(searchFilter.toLowerCase());
    return (
      item.category === selectedCategory &&
      item.name.toLowerCase().includes(searchFilter.toLowerCase())
    );
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleItemFormSubmit} />
      <Filter
        search={searchFilter}
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
      />
      <ul className="Items">
        {itemsToDisplay.map(item => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
