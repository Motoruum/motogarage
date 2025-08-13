-- Migration V8: Add 1:24 scale stock data (updated from sheet)
INSERT INTO stock_items (
  marka, model, renk, stant, kutu_durumu, stok_adedi,
  satis_fiyati, etsy_satis_fiyati, tedarik, uretici, durum,
  toptan_alis_fiyati, notlar, olcek
) VALUES
('Yamaha', 'YZR M1', 'Kırmızı', 'Var', 'Yok', 1, 1249.00, 59.00, 'V', 'ALTAYA', 'Sergilenmiş-Pleksi Mevcut', 550.00, 'X', '1:24'),
('Honda', '125 CC', 'Sarı', 'Var', 'Var', 1, 1249.00, 59.00, 'V', 'ALTAYA', 'Sergilenmiş-Pleksi Mevcut', 550.00, '', '1:24'),
('Ducati', '996R superbike', 'Gri', 'Var', 'Var', 1, 1249.00, 59.00, 'V', 'ALTAYA', 'Sergilenmiş-Pleksi Mevcut', 550.00, 'X', '1:24'),
('Ducati', '999 SuperBike', 'Kırmızı', 'Var', 'Var', 1, 1249.00, 59.00, 'V', 'ALTAYA', 'Sergilenmiş-Pleksi Mevcut', 550.00, 'X', '1:24'),
('Ducati', '900 SS', 'Gri', 'Var', 'Var', 1, 1249.00, 59.00, 'V', 'Ducati', 'Sıfır', 551.00, 'X', '1:24'),
('İndian 1:32', 'Scout Bopper', 'Kırmızı', 'Var', 'Var', 1, 849.00, 59.00, 'V', 'ALTAYA', 'Sergilenmiş-Pleksi Mevcut', 300.00, 'X', '1:24'),
('Yamaha', 'YZR500 Redbull', 'Lacivert', 'Var', 'Var', 1, 1449.00, 69.00, 'K', 'Altaya', 'Sergilenmiş-Pleksi Mevcut', 600.00, 'X', '1:24');
