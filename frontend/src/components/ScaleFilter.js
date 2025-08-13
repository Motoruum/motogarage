import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ScaleFilter = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { scale } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchItemsByScale();
  }, [scale]);

  const fetchItemsByScale = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/stock/scale/${scale}`);
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        toast.error('Veri yüklenirken hata oluştu');
      }
    } catch (error) {
      console.error('Error fetching items:', error);
      toast.error('Veri yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/stock/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          toast.success('Ürün başarıyla silindi');
          fetchItemsByScale();
        } else {
          toast.error('Ürün silinirken hata oluştu');
        }
      } catch (error) {
        console.error('Error deleting item:', error);
        toast.error('Ürün silinirken hata oluştu');
      }
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
          <h2 className="text-center">
            {getScaleDisplayName(scale)} Motorcycle Models
          </h2>
          <p className="text-center text-muted">
            Toplam {items.length} ürün bulundu
          </p>
        </Col>
      </Row>

      {items.length === 0 ? (
        <Row>
          <Col>
            <Card className="text-center p-5">
              <Card.Body>
                <h4>Bu ölçekte ürün bulunamadı</h4>
                <p className="text-muted">
                  {getScaleDisplayName(scale)} ölçeğinde henüz ürün eklenmemiş.
                </p>
                <Button 
                  variant="primary" 
                  onClick={() => navigate('/add')}
                >
                  Yeni Ürün Ekle
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row>
          {items.map((item) => (
            <Col key={item.id} lg={4} md={6} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{item.brand}</h5>
                    <Badge bg={item.stockQuantity > 0 ? 'success' : 'danger'}>
                      {item.stockQuantity > 0 ? 'Stokta' : 'Stok Yok'}
                    </Badge>
                  </div>
                  <h6 className="card-subtitle mb-2 text-muted">{item.model}</h6>
                  
                  <div className="mb-3">
                    <small className="text-muted">
                      <strong>Renk:</strong> {item.color}<br/>
                      <strong>Stant:</strong> {item.stand}<br/>
                      <strong>Kutu:</strong> {item.boxStatus}<br/>
                      <strong>Üretici:</strong> {item.manufacturer}<br/>
                      <strong>Durum:</strong> {item.condition}
                    </small>
                  </div>

                  <div className="mb-3">
                    <div className="row text-center">
                      <div className="col-6">
                        <small className="text-muted">Toptan Alış</small>
                        <div className="fw-bold text-primary">
                          ₺{item.wholesalePrice}
                        </div>
                      </div>
                      <div className="col-6">
                        <small className="text-muted">Satış Fiyatı</small>
                        <div className="fw-bold text-success">
                          ₺{item.salePrice}
                        </div>
                      </div>
                    </div>
                  </div>

                  {item.notes && (
                    <div className="mb-3">
                      <small className="text-muted">
                        <strong>Notlar:</strong> {item.notes}
                      </small>
                    </div>
                  )}

                  <div className="d-grid gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleEdit(item.id)}
                    >
                      Düzenle
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      Sil
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ScaleFilter;
