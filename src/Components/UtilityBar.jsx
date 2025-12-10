function UtilityBar({ applyQuery, sortBy, orderDir }) {
  const columns = {
    Date: "created_at",
    Likes: "votes",
    "Comment Count": "comment_count",
    Author: "author",
    Title: "title",
  };

  const orders = {
    Descending: "DESC",
    Ascending: "ASC",
  };

  function handleChange(event) {
    const type = Object.values(columns).includes(event.target.value)
      ? "sort_by"
      : "order";
    applyQuery?.(type, event.target.value);
  }

  return (
    <section>
      <label htmlFor="sort-dropdown">
        Sort By:
        <select onChange={handleChange} value={sortBy}>
          {Object.keys(columns).map((option) => {
            return (
              <option value={columns[option]} key={columns[option]}>
                {option}
              </option>
            );
          })}
        </select>
      </label>
      <label htmlFor="order-dropdown">
        Order:
        <select onChange={handleChange} value={orderDir}>
          {Object.keys(orders).map((order) => {
            return (
              <option value={orders[order]} key={orders[order]}>
                {order}
              </option>
            );
          })}
        </select>
      </label>
    </section>
  );
}

export default UtilityBar;
