/* eslint-disable react/prop-types */


const Filter = ({ categories, selectedCategory, onCategoryChange }) => {

  const handle = (e) => {
    onCategoryChange(e.target.value)
    
}

    return (
        <div>
            <select value={selectedCategory} onChange={handle}>
                <option value="All">All</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filter;
