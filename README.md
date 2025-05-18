# Fast React Pizza App 🍕

## Overview

The **Fast React Pizza App** is a web application designed to manage a pizza ordering system. It allows users to browse the menu, add items to their cart, create new orders, and track existing orders. The app is built using **React** and **React Router** for routing and state management.

---

## Features

### 1. **Home Page**

- Path: `/`
- Displays the homepage of the application.

### 2. **Menu**

- Path: `/menu`
- Displays the list of available pizzas.
- Uses a `loader` function (`menuLoader`) to fetch the menu data from the server.
- Handles errors gracefully with a custom `Error` component.

### 3. **Cart**

- Path: `/cart`
- Displays the user's cart with selected items and their quantities.

### 4. **Create Order**

- Path: `/order/new`
- Allows users to create a new order.
- Uses an `action` (`createOrderAction`) to handle form submissions for creating orders.

### 5. **Order Details**

- Path: `/order/:orderId`
- Displays details of a specific order based on the `orderId` parameter.
- Uses a `loader` (`orderLoader`) to fetch order details from the server.
- Allows updating the order using an `action` (`updateOrder`).
- Handles errors gracefully with a custom `Error` component.

---

## Application Structure

The app uses **React Router** for routing and is structured as follows:

### Router Configuration

The router is created using `createBrowserRouter` and includes the following routes:

- **Root Route**: Wraps the application in the `AppLayout` component.
- **Error Handling**: Displays the `Error` component for any route-related errors.
- **Nested Routes**:
  - `/`: Renders the `Home` component.
  - `/menu`: Renders the `Menu` component and fetches menu data using `menuLoader`.
  - `/cart`: Renders the `Cart` component.
  - `/order/new`: Renders the `CreateOrder` component and handles order creation via `createOrderAction`.
  - `/order/:orderId`: Renders the `Order` component, fetches order details using `orderLoader`, and allows updates via `updateOrder`.

### Components

- **AppLayout**: Provides the main layout for the application.
- **Error**: Handles and displays errors for any route.
- **Home**: Displays the homepage.
- **Menu**: Displays the pizza menu.
- **Cart**: Displays the user's cart.
- **CreateOrder**: Handles the creation of new orders.
- **Order**: Displays and manages details of a specific order.

---

## How It Works

1. **Routing**:

   - The app uses `createBrowserRouter` to define routes and their respective components, loaders, and actions.
   - Nested routes are used to organize the app's structure.

2. **Data Fetching**:

   - Loaders are used to fetch data for specific routes (e.g., `menuLoader` for `/menu` and `orderLoader` for `/order/:orderId`).

3. **Error Handling**:

   - The `Error` component is used to display user-friendly error messages for any issues during routing or data fetching.

4. **Actions**:
   - Actions handle form submissions and updates (e.g., `createOrderAction` for creating orders and `updateOrder` for updating existing orders).

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/fast-react-pizza.git
   ```
