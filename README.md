# MotoGarage Stock Management System

A comprehensive motorcycle model stock management system with scale-based filtering capabilities.

## Features

### Scale-Based Organization
The system organizes motorcycle models by different scales:
- **1:6** - Büyük Ölçek (Large Scale)
- **1:9** - Orta Ölçek (Medium Scale)  
- **1:10** - Orta Ölçek (Medium Scale)
- **1:12** - Orta Ölçek (Medium Scale)
- **1:18** - Standart Ölçek (Standard Scale)
- **1:24** - Küçük Ölçek (Small Scale)
- **1:32** - Çok Küçük Ölçek (Very Small Scale)

### Backend Features
- RESTful API endpoints for scale-based filtering
- Separate SQL queries for each scale
- Comprehensive stock item management
- Scale-specific data retrieval

### Frontend Features
- **Dashboard**: Overview of all scales with statistics
- **Scale Filter Pages**: Dedicated pages for each scale
- **Navigation**: Dropdown menu for easy scale navigation
- **Responsive Design**: Mobile-friendly interface

## API Endpoints

### Scale-Based Endpoints
- `GET /api/stock/scale/{olcek}` - Get items by specific scale
- `GET /api/stock/scales` - Get all available scales

### General Endpoints
- `GET /api/stock` - Get all stock items
- `GET /api/stock/{id}` - Get item by ID
- `POST /api/stock` - Create new item
- `PUT /api/stock/{id}` - Update existing item
- `DELETE /api/stock/{id}` - Delete item

## Database Structure

The system uses a `stock_items` table with the following key fields:
- `olcek` - Scale field for filtering
- `marka` - Brand (BMW, Ducati, Yamaha, etc.)
- `model` - Model name
- `renk` - Color
- `stok_adedi` - Stock quantity
- `satis_fiyati` - Sale price
- `toptan_alis_fiyati` - Wholesale price

## Getting Started

### Prerequisites
- Java 17+
- Node.js 16+
- Docker and Docker Compose

### Running the Application

1. **Start the backend:**
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

2. **Start the frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Using Docker:**
   ```bash
   docker-compose up -d
   ```

### Database Migrations

The system includes automatic database migrations:
- `V1__Create_stock_items_table.sql` - Creates the main table
- `V2__add_scale_field_and_update_data.sql` - Adds scale field and initial data
- `V3__add_all_scales_data.sql` - Adds sample data for all scales

## Usage

### Scale-Based Navigation
1. Use the "Ölçek Bazlı Görünüm" dropdown in the navigation
2. Select any scale to view items in that category
3. Each scale page shows filtered results with scale-specific information

### Dashboard
- View statistics for all scales at once
- See total items, stock levels, and values per scale
- Quick navigation to specific scale pages

### Adding New Items
- Use the "Yeni Ürün Ekle" form
- Select the appropriate scale from the dropdown
- All scales are available in the form

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
