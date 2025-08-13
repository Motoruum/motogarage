import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ScaleDashboard = () => {
  const [scaleStats, setScaleStats] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchScaleStatistics();
  }, []);

  const fetchScaleStatistics = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/stock/scales');
      if (response.ok) {
        const scales = await response.json();
        const stats = {};
        
        // Fetch data for each scale
        for (const scale of scales) {
          const scaleResponse = await fetch(`http://localhost:8080/api/stock/scale/${scale}`);
          if (scaleResponse.ok) {
            const items = await scaleResponse.json();
            stats[scale] = {
              totalItems: items.length,
              inStock: items.filter(item => item.stockQuantity > 0).length,
              outOfStock: items.filter(item => item.stockQuantity === 0).length,
              totalValue: items.reduce((sum, item) => sum + (item.salePrice * item.stockQuantity), 0),
              averagePrice: items.length > 0 ? items.reduce((sum, item) => sum + item.salePrice, 0) / items.length : 0
            };
          }
        }
        
        setScaleStats(stats);
      }
    } catch (error) {
      console.error('Error fetching scale statistics:', error);
      toast.error('İstatistikler yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const getScaleDisplayName = (scale) => {
    const scaleNames = {
      '1:6': '1:6 (Büyük Ölçek)',
      '1:9': '1:9 (Orta Ölçek)',
      '1:10': '1:10 (Orta Ölçek)',
      '1:12': '1:12 (Orta Ölçek)',
      '1:18': '1:18 (Standart Ölçek)',
      '1:24': '1:24 (Küçük Ölçek)',
      '1:32': '1:32 (Çok Küçük Ölçek)'
    };
    return scaleNames[scale] || scale;
  };

  const getScaleColor = (scale) => {
    const colors = {
      '1:6': 'primary',
      '1:9': 'info',
      '1:10': 'info',
      '1:12': 'info',
      '1:18': 'success',
      '1:24': 'warning',
      '1:32': 'secondary'
    };
    return colors[scale] || 'light';
  };

  if (loading) {
    return (
      <Container>
        <div className="text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2 className="text-center">Ölçek Bazlı Stok Dashboard</h2>
          <p className="text-center text-muted">
            Tüm ölçeklerdeki ürünlerin genel görünümü
          </p>
        </Col>
      </Row>

      <Row>
        {Object.entries(scaleStats).map(([scale, stats]) => (
          <Col key={scale} lg={4} md={6} className="mb-4">
            <Card className={`border-${getScaleColor(scale)} h-100`}>
              <Card.Header className={`bg-${getScaleColor(scale)} text-white`}>
                <h5 className="mb-0">{getScaleDisplayName(scale)}</h5>
              </Card.Header>
              <Card.Body>
                <div className="text-center mb-3">
                  <h3 className="text-primary">{stats.totalItems}</h3>
                  <small className="text-muted">Toplam Ürün</small>
                </div>
                
                <Row className="mb-3">
                  <Col className="text-center">
                    <div className="text-success fw-bold">{stats.inStock}</div>
                    <small className="text-muted">Stokta</small>
                  </Col>
                  <Col className="text-center">
                    <div className="text-danger fw-bold">{stats.outOfStock}</div>
                    <small className="text-muted">Stok Yok</small>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col className="text-center">
                    <div className="text-info fw-bold">₺{stats.totalValue.toLocaleString()}</div>
                    <small className="text-muted">Toplam Değer</small>
                  </Col>
                  <Col className="text-center">
                    <div className="text-warning fw-bold">₺{stats.averagePrice.toFixed(0)}</div>
                    <small className="text-muted">Ortalama Fiyat</small>
                  </Col>
                </Row>

                <div className="d-grid">
                  <Button
                    variant={`outline-${getScaleColor(scale)}`}
                    onClick={() => navigate(`/scale/${scale}`)}
                  >
                    Detayları Görüntüle
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-4">
        <Col className="text-center">
          <Button 
            variant="success" 
            size="lg"
            onClick={() => navigate('/add')}
          >
            🏍️ Yeni Ürün Ekle
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ScaleDashboard;
