package com.motogarage.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

@Entity
@Table(name = "stock_items")
public class StockItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Brand is required")
    @Column(name = "brand", nullable = false)
    private String brand;

    @NotBlank(message = "Model is required")
    @Column(name = "model", nullable = false)
    private String model;

    @NotBlank(message = "Color is required")
    @Column(name = "color", nullable = false)
    private String color;

    @Column(name = "stand")
    private String stand;

    @Column(name = "box_status")
    private String boxStatus;

    @NotNull(message = "Stock quantity is required")
    @Min(value = 0, message = "Stock quantity must be >= 0")
    @Column(name = "stock_quantity", nullable = false)
    private Integer stockQuantity;

    @NotNull(message = "Sale price is required")
    @Min(value = 0, message = "Sale price must be >= 0")
    @Column(name = "sale_price", nullable = false)
    private BigDecimal salePrice;

    @NotNull(message = "Etsy sale price is required")
    @Min(value = 0, message = "Etsy sale price must be >= 0")
    @Column(name = "etsy_price", nullable = false)
    private BigDecimal etsyPrice;

    @Column(name = "etsy")
    private Boolean etsy = false;

    @Column(name = "dolap")
    private Boolean dolap = false;

    @Column(name = "trendyol")
    private Boolean trendyol = false;

    @Column(name = "ciceksepeti")
    private Boolean ciceksepeti = false;

    @Column(name = "website")
    private Boolean website = false;

    @NotBlank(message = "Manufacturer is required")
    @Column(name = "manufacturer", nullable = false)
    private String manufacturer;

    @Column(name = "condition")
    private String condition;

    @NotNull(message = "Wholesale price is required")
    @Min(value = 0, message = "Wholesale price must be >= 0")
    @Column(name = "wholesale_price", nullable = false)
    private BigDecimal wholesalePrice;

    @Column(name = "notes")
    private String notes;

    @Column(name = "scale")
    private String scale;

    // Constructors
    public StockItem() {}

    public StockItem(String brand, String model, String color, String stand, String boxStatus,
                    Integer stockQuantity, BigDecimal salePrice, BigDecimal etsyPrice,
                    Boolean etsy, Boolean dolap, Boolean trendyol, Boolean ciceksepeti, Boolean website,
                    String manufacturer, String condition, BigDecimal wholesalePrice, String notes, String scale) {
        this.brand = brand;
        this.model = model;
        this.color = color;
        this.stand = stand;
        this.boxStatus = boxStatus;
        this.stockQuantity = stockQuantity;
        this.salePrice = salePrice;
        this.etsyPrice = etsyPrice;
        this.etsy = etsy;
        this.dolap = dolap;
        this.trendyol = trendyol;
        this.ciceksepeti = ciceksepeti;
        this.website = website;
        this.manufacturer = manufacturer;
        this.condition = condition;
        this.wholesalePrice = wholesalePrice;
        this.notes = notes;
        this.scale = scale;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getStand() {
        return stand;
    }

    public void setStand(String stand) {
        this.stand = stand;
    }

    public String getBoxStatus() {
        return boxStatus;
    }

    public void setBoxStatus(String boxStatus) {
        this.boxStatus = boxStatus;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public BigDecimal getSalePrice() {
        return salePrice;
    }

    public void setSalePrice(BigDecimal salePrice) {
        this.salePrice = salePrice;
    }

    public BigDecimal getEtsyPrice() {
        return etsyPrice;
    }

    public void setEtsyPrice(BigDecimal etsyPrice) {
        this.etsyPrice = etsyPrice;
    }

    public Boolean getEtsy() {
        return etsy != null ? etsy : false;
    }

    public void setEtsy(Boolean etsy) {
        this.etsy = etsy != null ? etsy : false;
    }

    public Boolean getDolap() {
        return dolap != null ? dolap : false;
    }

    public void setDolap(Boolean dolap) {
        this.dolap = dolap != null ? dolap : false;
    }

    public Boolean getTrendyol() {
        return trendyol != null ? trendyol : false;
    }

    public void setTrendyol(Boolean trendyol) {
        this.trendyol = trendyol != null ? trendyol : false;
    }

    public Boolean getCiceksepeti() {
        return ciceksepeti != null ? ciceksepeti : false;
    }

    public void setCiceksepeti(Boolean ciceksepeti) {
        this.ciceksepeti = ciceksepeti != null ? ciceksepeti : false;
    }

    public Boolean getWebsite() {
        return website != null ? website : false;
    }

    public void setWebsite(Boolean website) {
        this.website = website != null ? website : false;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public BigDecimal getWholesalePrice() {
        return wholesalePrice;
    }

    public void setWholesalePrice(BigDecimal wholesalePrice) {
        this.wholesalePrice = wholesalePrice;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getScale() {
        return scale;
    }

    public void setScale(String scale) {
        this.scale = scale;
    }
}
