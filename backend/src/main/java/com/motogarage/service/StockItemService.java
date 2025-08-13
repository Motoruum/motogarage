package com.motogarage.service;

import com.motogarage.entity.StockItem;
import com.motogarage.repository.StockItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.annotation.PostConstruct;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class StockItemService {

    @Autowired
    private StockItemRepository stockItemRepository;

    @PostConstruct
    public void checkLowStockOnStartup() {
        List<StockItem> lowStockItems = stockItemRepository.findLowStockItems();
        if (!lowStockItems.isEmpty()) {
            System.out.println("=== LOW STOCK ALERTS ===");
            for (StockItem item : lowStockItems) {
                System.out.printf("LOW STOCK: %s %s %s - Quantity: %d%n", 
                    item.getBrand(), item.getModel(), item.getColor(), item.getStockQuantity());
            }
            System.out.println("========================");
        }
    }

    public List<StockItem> getAllStockItems() {
        return stockItemRepository.findAll();
    }

    public Optional<StockItem> getStockItemById(Long id) {
        return stockItemRepository.findById(id);
    }

    public StockItem saveStockItem(StockItem stockItem) {
        return stockItemRepository.save(stockItem);
    }

    public void deleteStockItem(Long id) {
        stockItemRepository.deleteById(id);
    }

    public List<StockItem> searchStockItems(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return getAllStockItems();
        }
        
        String term = searchTerm.trim().toLowerCase();
        List<StockItem> results = stockItemRepository.findByBrandContainingIgnoreCase(term);
        results.addAll(stockItemRepository.findByModelContainingIgnoreCase(term));
        
        return results.stream().distinct().toList();
    }

    public List<StockItem> getStockItemsByScale(String scale) {
        return stockItemRepository.findByScale(scale);
    }

    public List<StockItem> getLowStockItems() {
        return stockItemRepository.findLowStockItems();
    }

    public List<StockItem> getStockItemsWithQuantityGreaterThan(Integer minStock) {
        return stockItemRepository.findByStockQuantityGreaterThan(minStock);
    }

    public List<String> getAllScales() {
        return stockItemRepository.findAllScales();
    }
}
