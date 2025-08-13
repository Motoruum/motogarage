-- Migration V5: Add 1:6 scale stock data (updated)
INSERT INTO stock_items (
  marka, model, renk, stant, kutu_durumu, stok_adedi,
  satis_fiyati, etsy_satis_fiyati, tedarik, uretici, durum,
  toptan_alis_fiyati, notlar, olcek
) VALUES
('Lego', 'Kawasaki Ninja', 'Siyah', 'Yok', 'Yok', 1, 3499.00, 89.00, 'V', 'Lego', 'Sergilenmiş', 1000.00, '', '1:6'),
('BMW', 'R1200 C', 'Krem', 'Yok', 'Yok', 0, 3849.00, 149.00, 'V', '…', 'Sergilenmiş', 700.00, '', '1:6'),
('Action Man', 'Cross 90''s Toys', 'Turuncu', 'Yok', 'Yok', 1, 1799.00, 79.00, 'V', 'Action Man', 'Sergilenmiş', 350.00, '', '1:6');
