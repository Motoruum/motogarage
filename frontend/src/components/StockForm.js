import React, { useState, useEffect } from 'react';
import { 
  Form, 
  Button, 
  Card, 
  Row, 
  Col, 
  Spinner, 
  InputGroup
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const StockForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    scale: '1:18',
    color: '',
    stand: '',
    boxStatus: '',
    stockQuantity: 0,
    salePrice: 0,
    etsyPrice: 0,
    etsy: false,
    dolap: false,
    trendyol: false,
    ciceksepeti: false,
    website: false,
    manufacturer: '',
    condition: '',
    wholesalePrice: 0,
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      fetchStockItem();
    }
  }, [id, isEditMode]);

  const fetchStockItem = async () => {
    try {
      setFetching(true);
      const response = await axios.get(`/api/stock/${id}`);
      setFormData(response.data);
    } catch (err) {
      toast.error('Failed to fetch item details');
      navigate('/');
    } finally {
      setFetching(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.brand.trim()) {
      newErrors.brand = 'Brand is required';
    }
    if (!formData.model.trim()) {
      newErrors.model = 'Model is required';
    }
    if (!formData.color.trim()) {
      newErrors.color = 'Color is required';
    }
    if (!formData.manufacturer.trim()) {
      newErrors.manufacturer = 'Manufacturer is required';
    }
    if (formData.stockQuantity < 0) {
      newErrors.stockQuantity = 'Stock count must be >= 0';
    }
    if (formData.salePrice < 0) {
      newErrors.salePrice = 'Sale price must be >= 0';
    }
    if (formData.etsyPrice < 0) {
      newErrors.etsyPrice = 'Etsy price must be >= 0';
    }
    if (formData.wholesalePrice < 0) {
      newErrors.wholesalePrice = 'Wholesale price must be >= 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      
      if (isEditMode) {
        await axios.put(`/api/stock/${id}`, formData);
        toast.success('Item updated successfully');
      } else {
        await axios.post('/api/stock', formData);
        toast.success('Item created successfully');
      }
      
      navigate('/');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Operation failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Card>
      <Card.Header>
        <h2>{isEditMode ? 'Edit Stock Item' : 'Add New Stock Item'}</h2>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Brand (Marka) *</Form.Label>
                <Form.Control
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  isInvalid={!!errors.brand}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.brand}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Model *</Form.Label>
                <Form.Control
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  isInvalid={!!errors.model}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.model}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Scale (Ölçek) *</Form.Label>
                <Form.Select
                  name="scale"
                  value={formData.scale}
                  onChange={handleInputChange}
                >
                  <option value="1:6">1:6 (Büyük Ölçek)</option>
                  <option value="1:9">1:9 (Orta Ölçek)</option>
                  <option value="1:10">1:10 (Orta Ölçek)</option>
                  <option value="1:12">1:12 (Orta Ölçek)</option>
                  <option value="1:18">1:18 (Standart Ölçek)</option>
                  <option value="1:24">1:24 (Küçük Ölçek)</option>
                  <option value="1:32">1:32 (Çok Küçük Ölçek)</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Color (Renk) *</Form.Label>
                <Form.Control
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  isInvalid={!!errors.color}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.color}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Stand (Stant)</Form.Label>
                <Form.Select
                  name="stand"
                  value={formData.stand}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="Mevcut">Available</option>
                  <option value="Yok">Not Available</option>
                  <option value="Üretiminde yok">Out of Production</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Box Status (Kutu Durumu)</Form.Label>
                <Form.Select
                  name="boxStatus"
                  value={formData.boxStatus}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="Mevcut">Available</option>
                  <option value="Yok">Not Available</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Stock Count (Stok Adedi) *</Form.Label>
                <Form.Control
                  type="number"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleInputChange}
                  min="0"
                  isInvalid={!!errors.stockQuantity}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.stockQuantity}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Sale Price (TL) *</Form.Label>
                <InputGroup>
                  <InputGroup.Text>₺</InputGroup.Text>
                  <Form.Control
                    type="number"
                    name="salePrice"
                    value={formData.salePrice}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    isInvalid={!!errors.salePrice}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.salePrice}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Etsy Price (€) *</Form.Label>
                <InputGroup>
                  <InputGroup.Text>€</InputGroup.Text>
                  <Form.Control
                    type="number"
                    name="etsyPrice"
                    value={formData.etsyPrice}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    isInvalid={!!errors.etsyPrice}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.etsyPrice}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Platforms (Platformlar)</Form.Label>
                <div className="d-flex flex-column gap-2">
                  <Form.Check
                    type="checkbox"
                    id="etsy"
                    name="etsy"
                    label="ETSY"
                    checked={formData.etsy}
                    onChange={(e) => setFormData(prev => ({ ...prev, etsy: e.target.checked }))}
                  />
                  <Form.Check
                    type="checkbox"
                    id="dolap"
                    name="dolap"
                    label="DOLAP"
                    checked={formData.dolap}
                    onChange={(e) => setFormData(prev => ({ ...prev, dolap: e.target.checked }))}
                  />
                  <Form.Check
                    type="checkbox"
                    id="trendyol"
                    name="trendyol"
                    label="TRENDYOL"
                    checked={formData.trendyol}
                    onChange={(e) => setFormData(prev => ({ ...prev, trendyol: e.target.checked }))}
                  />
                  <Form.Check
                    type="checkbox"
                    id="ciceksepeti"
                    name="ciceksepeti"
                    label="ÇİÇEKSEPETİ"
                    checked={formData.ciceksepeti}
                    onChange={(e) => setFormData(prev => ({ ...prev, ciceksepeti: e.target.checked }))}
                  />
                  <Form.Check
                    type="checkbox"
                    id="website"
                    name="website"
                    label="WEBSITE"
                    checked={formData.website}
                    onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.checked }))}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Manufacturer (Üretici) *</Form.Label>
                <Form.Control
                  type="text"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleInputChange}
                  isInvalid={!!errors.manufacturer}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.manufacturer}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Condition (Durum)</Form.Label>
                <Form.Select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="Sıfır">New</option>
                  <option value="Sergilenmiş">Displayed</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Wholesale Price (TL) *</Form.Label>
                <InputGroup>
                  <InputGroup.Text>₺</InputGroup.Text>
                  <Form.Control
                    type="number"
                    name="wholesalePrice"
                    value={formData.wholesalePrice}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    isInvalid={!!errors.wholesalePrice}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.wholesalePrice}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Notes (Notlar)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Additional notes..."
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  {isEditMode ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                isEditMode ? 'Update Item' : 'Create Item'
              )}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/')}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default StockForm;
