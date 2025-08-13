package com.motogarage.controller;

import com.motogarage.entity.StockItem;
import com.motogarage.service.StockItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/stock")
@CrossOrigin(origins = "*")
public class StockItemController {

    @Autowired
    private StockItemService stockItemService;

    @GetMapping
    public ResponseEntity<List<StockItem>> getAllStockItems() {
        List<StockItem> items = stockItemService.getAllStockItems();
        return ResponseEntity.ok(items);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockItem> getStockItemById(@PathVariable Long id) {
        Optional<StockItem> item = stockItemService.getStockItemById(id);
        return item.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<StockItem> createStockItem(@Valid @RequestBody StockItem stockItem) {
        StockItem savedItem = stockItemService.saveStockItem(stockItem);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StockItem> updateStockItem(@PathVariable Long id, @Valid @RequestBody StockItem stockItemDetails) {
        Optional<StockItem> optionalStockItem = stockItemService.getStockItemById(id);
        if (optionalStockItem.isPresent()) {
            StockItem stockItem = optionalStockItem.get();
            stockItem.setBrand(stockItemDetails.getBrand());
            stockItem.setModel(stockItemDetails.getModel());
            stockItem.setColor(stockItemDetails.getColor());
            stockItem.setStand(stockItemDetails.getStand());
            stockItem.setBoxStatus(stockItemDetails.getBoxStatus());
            stockItem.setStockQuantity(stockItemDetails.getStockQuantity());
            stockItem.setSalePrice(stockItemDetails.getSalePrice());
            stockItem.setEtsyPrice(stockItemDetails.getEtsyPrice());
            stockItem.setEtsy(stockItemDetails.getEtsy());
            stockItem.setDolap(stockItemDetails.getDolap());
            stockItem.setTrendyol(stockItemDetails.getTrendyol());
            stockItem.setCiceksepeti(stockItemDetails.getCiceksepeti());
            stockItem.setManufacturer(stockItemDetails.getManufacturer());
            stockItem.setCondition(stockItemDetails.getCondition());
            stockItem.setWholesalePrice(stockItemDetails.getWholesalePrice());
            stockItem.setNotes(stockItemDetails.getNotes());
            stockItem.setScale(stockItemDetails.getScale());
            StockItem updatedItem = stockItemService.saveStockItem(stockItem);
            return ResponseEntity.ok(updatedItem);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStockItem(@PathVariable Long id) {
        stockItemService.deleteStockItem(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<StockItem>> searchStockItems(@RequestParam(required = false) String q) {
        List<StockItem> items = stockItemService.searchStockItems(q);
        return ResponseEntity.ok(items);
    }

    @GetMapping("/scale/{scale}")
    public ResponseEntity<List<StockItem>> getStockItemsByScale(@PathVariable String scale) {
        List<StockItem> items = stockItemService.getStockItemsByScale(scale);
        return ResponseEntity.ok(items);
    }

    @GetMapping("/scales")
    public ResponseEntity<List<String>> getAllScales() {
        List<String> scales = stockItemService.getAllScales();
        return ResponseEntity.ok(scales);
    }

    @GetMapping("/low-stock")
    public ResponseEntity<List<StockItem>> getLowStockItems() {
        List<StockItem> items = stockItemService.getLowStockItems();
        return ResponseEntity.ok(items);
    }

    @GetMapping("/in-stock")
    public ResponseEntity<List<StockItem>> getInStockItems() {
        List<StockItem> items = stockItemService.getStockItemsWithQuantityGreaterThan(0);
        return ResponseEntity.ok(items);
    }
}
