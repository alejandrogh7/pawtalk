import { useState, useEffect } from "react";
import { Rooms } from "../features/rooms/room.interface";

const useSearch = (items: Rooms[]) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<Rooms[]>([]);

  useEffect(() => {
    setFilteredItems(
      items.filter((item) =>
        item.roomname
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase())
      )
    );
  }, [items, searchTerm]);

  return { searchTerm, filteredItems, setSearchTerm };
};

export default useSearch;
