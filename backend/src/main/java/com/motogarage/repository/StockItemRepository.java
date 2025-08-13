package com.motogarage.repository;

import com.motogarage.entity.StockItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockItemRepository extends JpaRepository<StockItem, Long> {

    @Query("SELECT s FROM StockItem s WHERE s.stockQuantity <= 1")
    List<StockItem> findLowStockItems();

    List<StockItem> findByBrandContainingIgnoreCase(String brand);

    List<StockItem> findByModelContainingIgnoreCase(String model);

    List<StockItem> findByStockQuantityGreaterThan(Integer minStock);
    
    // Scale-based queries
    List<StockItem> findByScale(String scale);
    
    @Query("SELECT DISTINCT s.scale FROM StockItem s ORDER BY s.scale")
    List<String> findAllScales();
}
