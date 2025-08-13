CREATE TABLE stock_items (
    id BIGSERIAL PRIMARY KEY,
    marka VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    renk VARCHAR(100) NOT NULL,
    stant VARCHAR(100),
    kutu_durumu VARCHAR(100),
    stok_adedi INTEGER NOT NULL CHECK (stok_adedi >= 0),
    satis_fiyati DECIMAL(10,2) NOT NULL CHECK (satis_fiyati >= 0),
    etsy_satis_fiyati DECIMAL(10,2) NOT NULL CHECK (etsy_satis_fiyati >= 0),
    tedarik VARCHAR(10),
    uretici VARCHAR(100) NOT NULL,
    durum VARCHAR(100),
    toptan_alis_fiyati DECIMAL(10,2) NOT NULL CHECK (toptan_alis_fiyati >= 0),
    notlar TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_stock_items_marka ON stock_items(marka);
CREATE INDEX idx_stock_items_model ON stock_items(model);
CREATE INDEX idx_stock_items_stok_adedi ON stock_items(stok_adedi);
CREATE INDEX idx_stock_items_uretici ON stock_items(uretici);

-- Insert sample data
INSERT INTO stock_items (marka, model, renk, stant, kutu_durumu, stok_adedi, satis_fiyati, etsy_satis_fiyati, tedarik, uretici, durum, toptan_alis_fiyati, notlar) VALUES
('Yamaha', 'Vmax', 'Gri-Siyah', 'Yok', 'Yok', 1, 849.00, 54.90, 'V', 'Maisto', 'Sergilenmiş', 425.00, ''),
('Aprilla', 'Shiver 125', 'Kırmızı', 'Mevcut', 'Mevcut', 1, 599.00, 49.00, 'V', 'Welly', 'Sıfır', 270.00, ''),
('BMW', 'S1000RR', 'Yeşil', 'Mevcut', 'Mevcut', 0, 949.00, 59.00, 'V', 'Maisto', 'Sıfır', 400.00, ''),
('BMW', 'R Nine T Urban GS', 'Kahve-Gri', 'Mevcut', 'Mevcut', 1, 949.00, 59.00, 'V', 'Maisto', 'Sıfır', 300.00, ''),
('BMW', 'R1250 GS', 'Mavi', 'Mevcut', 'Mevcut', 1, 999.00, 59.00, 'V', 'Maisto', 'Sıfır', 550.00, ''),
('BMW', 'R Nine T Urban GS', 'Beyaz-Kırmızı', 'Üretiminde yok', 'Mevcut', 4, 549.00, 49.00, 'V', 'Bburago', 'Sıfır', 280.00, '2 wheleers Serisi'),
('BMW', 'HP2', 'Beyaz-Siyah', 'Üretiminde yok', 'Mevcut', 1, 849.00, 54.90, 'V', 'Maisto', 'Sıfır', 350.00, ''),
('BMW', 'R1200CL', 'Mavi', 'Mevcut', 'Yok', 2, 749.00, 54.90, 'V', 'Maisto', 'Sergilenmiş', 300.00, ''),
('BMW', 'R1200C', 'Krem', 'Mevcut', 'Yok', 1, 949.00, 59.00, 'V', 'Maisto', 'Sergilenmiş', 450.00, '');
