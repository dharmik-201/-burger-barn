export type MenuItem = { name: string; price: number };
export type MenuGroup = { title: string; note?: string; items: MenuItem[] };

export const menuGroups: MenuGroup[] = [
  {
    title: "Burgers",
    note: "Hand-pressed patties, toasted buns",
    items: [
      { name: "Veg Burger", price: 60 },
      { name: "Aloo Tikki Burger", price: 70 },
      { name: "Cheese Burger", price: 90 },
      { name: "Paneer Burger", price: 110 },
      { name: "Burger Barn Special", price: 140 },
      { name: "Double Decker Cheese Burger", price: 170 },
    ],
  },
  {
    title: "Milkshakes",
    note: "Thick, cold, unapologetic",
    items: [
      { name: "Vanilla", price: 100 },
      { name: "Chocolate", price: 120 },
      { name: "Rose", price: 120 },
      { name: "Strawberry", price: 120 },
      { name: "Oreo KiKi", price: 130 },
      { name: "Kitkat Break", price: 130 },
      { name: "Butter Scotch", price: 130 },
      { name: "Kesar Thanda", price: 140 },
    ],
  },
  {
    title: "Cold Special",
    items: [
      { name: "Cold Coffee", price: 110 },
      { name: "Hazelnut", price: 130 },
      { name: "Mocha", price: 130 },
      { name: "Cold Coco", price: 120 },
      { name: "Cold Coco with Ice Cream", price: 150 },
    ],
  },
  {
    title: "Mojito",
    items: [
      { name: "Lime Soda", price: 60 },
      { name: "Mint Mojito", price: 90 },
      { name: "Blue Berry", price: 100 },
      { name: "Watermelon", price: 100 },
      { name: "Orange", price: 100 },
      { name: "Cranberry", price: 120 },
      { name: "Green Apple", price: 120 },
    ],
  },
  {
    title: "Fries & Sides",
    note: "Hand-cut, double fried",
    items: [
      { name: "Salted Fries", price: 80 },
      { name: "Peri Peri Fries", price: 100 },
      { name: "Cheesy Fries", price: 120 },
      { name: "Potato Cheese Shots", price: 130 },
      { name: "Grilled Sandwich", price: 90 },
      { name: "Cheese Chilli Toast", price: 110 },
    ],
  },
  {
    title: "Hot Beverages",
    items: [
      { name: "Hot Coffee", price: 60 },
      { name: "Black Coffee", price: 60 },
      { name: "Masala Tea", price: 60 },
      { name: "Ginger Tea", price: 60 },
      { name: "Green Tea", price: 60 },
      { name: "Hot Chocolate", price: 100 },
      { name: "Nutella Hot Chocolate", price: 120 },
    ],
  },
];