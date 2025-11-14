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
    <>
      <label htmlFor="sort-dropdown">
        Sort By:
        <select id="sort-dropdown" onChange={handleChange} value={sortBy}>
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
        <select id="order-dropdown" onChange={handleChange} value={orderDir}>
          {Object.keys(orders).map((order) => {
            return (
              <option value={orders[order]} key={orders[order]}>
                {order}
              </option>
            );
          })}
        </select>
      </label>
    </>
  );
}

export default UtilityBar;
