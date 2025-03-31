
# Full Stack Developer Project: Store Listings Website

## Project Overview

This project aims to develop a full-featured website for displaying store listings with dynamic functionalities such as pagination, infinite scroll, sorting, filtering, store search, and bookmarking. The goal is to create an intuitive and interactive interface for users to explore stores by various parameters and categories.

---

## Technologies Used

- Backend: Python (Flask)
- Frontend: HTML, CSS, JavaScript, Bootstrap
- Database: MySQL
- API: RESTful APIs to manage store data and perform CRUD operations
- Others: jQuery for dynamic page interactions, AJAX for asynchronous operations

---

## Features

1. **Sidebar Categories**  
   - Displays a list of available categories.
   
2. **Paginated Store Listings**  
   - Shows a list of stores with pagination; only the first page is loaded initially.

3. **Infinite Scroll**  
   - Dynamically loads more stores when the user scrolls to the bottom of the page.

4. **Category Filter**  
   - Filters stores by category and highlights the selected category.

5. **Store Sorting**  
   - Allows sorting stores by name, featured, popularity, and cashback.

6. **Store Filters**  
   - Provides additional filtering options by category, status, alphabet, and boolean attributes.

7. **Store Search**  
   - Enables searching for stores by name.

8. **Bookmark Stores**  
   - Allows users to favorite stores and store the status locally.

9. **URL Parameters**  
   - Stores filter, search, and sort options in URL parameters for easy sharing and bookmarking.

---

## Project Setup

1. **Clone the repository**:

    ```bash
    git clone <repository_url>
    cd <project_directory>
    ```

2. **Set up the backend**:
    - Install dependencies using pip:
    ```bash
    pip install -r requirements.txt
    ```

3. **Set up the database**:
    - Make sure to set up MySQL and configure the database with the appropriate credentials.
    - Run the SQL script to set up the database schema.

4. **Run the project**:
    - Start the Flask server:
    ```bash
    python app.py
    ```

5. **Access the website**:
    - Navigate to `http://localhost:5000` to view the store listings.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

