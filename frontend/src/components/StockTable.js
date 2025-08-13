import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Badge, 
  Spinner, 
  Alert, 
  Modal, 
  Form,
  InputGroup,
  Row,
  Col,
  Card
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const StockTable = () => {
  const [stockItems, setStockItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedScale, setSelectedScale] = useState('all');
  const [availableScales, setAvailableScales] = useState([]);
  
  // Sorting state
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  
  const navigate = useNavigate();

  // CSS styles for sortable headers
  const sortableHeaderStyle = {
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background-color 0.2s ease',
    position: 'relative'
  };

  const sortableHeaderHoverStyle = {
    backgroundColor: '#495057',
    transform: 'scale(1.02)'
  };

  // CSS styles for better table readability
  const tableStyle = {
    fontSize: '14px'
  };

  const platformColumnStyle = {
    minWidth: '120px',
    textAlign: 'center'
  };

  useEffect(() => {
    fetchStockItems();
    fetchScales();
  }, []);

  const fetchStockItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/stock');
      setStockItems(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch stock items');
      toast.error('Failed to fetch stock items');
    } finally {
      setLoading(false);
    }
  };

  const fetchScales = async () => {
    try {
      const response = await axios.get('/api/stock/scales');
      setAvailableScales(response.data);
    } catch (err) {
      console.error('Failed to fetch scales:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/stock/${itemToDelete.id}`);
      setStockItems(stockItems.filter(item => item.id !== itemToDelete.id));
      toast.success('Item deleted successfully');
      setShowDeleteModal(false);
      setItemToDelete(null);
    } catch (err) {
      toast.error('Failed to delete item');
    }
  };

  const confirmDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handlePlatformChange = async (itemId, platform, value) => {
    try {
      // Optimistically update the UI
      setStockItems(prevItems => 
        prevItems.map(item => 
          item.id === itemId 
            ? { ...item, [platform]: value }
            : item
        )
      );

      // Update in database
      const response = await axios.get(`/api/stock/${itemId}`);
      const currentItem = response.data;
      
      const updatedItem = {
        ...currentItem,
        [platform]: value
      };

      await axios.put(`/api/stock/${itemId}`, updatedItem);
      toast.success(`${getColumnDisplayName(platform)} updated successfully`);
    } catch (err) {
      // Revert the optimistic update on error
      setStockItems(prevItems => 
        prevItems.map(item => 
          item.id === itemId 
            ? { ...item, [platform]: !value }
            : item
        )
      );
      toast.error(`Failed to update ${getColumnDisplayName(platform)}`);
      console.error('Error updating platform:', err);
    }
  };

  const handleSort = (field) => {
    console.log('handleSort called with field:', field); // Debug log
    
    if (!field) {
      console.log('No field provided, returning'); // Debug log
      return;
    }
    
    if (sortField === field) {
      // If clicking the same field, toggle direction
      console.log('Toggling sort direction from', sortDirection, 'to', sortDirection === 'asc' ? 'desc' : 'asc'); // Debug log
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // If clicking a new field, set it as sort field with ascending direction
      console.log('Setting new sort field:', field, 'with direction: asc'); // Debug log
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) {
      return <span className="text-muted">↕️</span>;
    }
    return sortDirection === 'asc' ? <span className="text-primary">↑</span> : <span className="text-primary">↓</span>;
  };

  const getColumnDisplayName = (field) => {
    const displayNames = {
      'stockQuantity': 'Stock Count',
      'brand': 'Brand',
      'model': 'Model',
      'scale': 'Scale',
      'color': 'Color',
      'stand': 'Stand',
      'boxStatus': 'Box Status',
      'salePrice': 'Sale Price',
      'etsyPrice': 'Etsy Price',
      'etsy': 'ETSY',
      'dolap': 'DOLAP',
      'trendyol': 'TRENDYOL',
      'ciceksepeti': 'ÇİÇEKSEPETİ',
      'website': 'WEBSITE',
      'manufacturer': 'Manufacturer',
      'condition': 'Condition',
      'wholesalePrice': 'Wholesale Price',
      'notes': 'Notes'
    };
    return displayNames[field] || field;
  };

  const sortItems = (items) => {
    if (!sortField) return items;

    return [...items].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle null/undefined values
      if (aValue === null || aValue === undefined) aValue = '';
      if (bValue === null || bValue === undefined) bValue = '';

      // Handle numeric values
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // Handle BigDecimal values (convert to string for comparison)
      if (aValue && typeof aValue === 'object' && aValue.constructor.name === 'BigDecimal') {
        aValue = aValue.toString();
      }
      if (bValue && typeof bValue === 'object' && bValue.constructor.name === 'BigDecimal') {
        bValue = bValue.toString();
      }

      // Handle string values
      aValue = aValue.toString().toLowerCase();
      bValue = bValue.toString().toLowerCase();

      if (sortDirection === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  };

  const filteredItems = stockItems.filter(item => {
    const matchesSearch = 
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesScale = selectedScale === 'all' || item.scale === selectedScale;

    if (filterType === 'inStock') {
      return matchesSearch && matchesScale && item.stockQuantity > 0;
    } else if (filterType === 'outOfStock') {
      return matchesSearch && matchesScale && item.stockQuantity === 0;
    } else if (filterType === 'lowStock') {
      return matchesSearch && matchesScale && item.stockQuantity <= 1;
    }
    
    return matchesSearch && matchesScale;
  });

  // Apply sorting to filtered items
  const sortedItems = sortItems(filteredItems);

  const getStockStatusBadge = (stockCount) => {
    if (stockCount === 0) {
      return <Badge bg="danger">Out of Stock</Badge>;
    } else if (stockCount <= 1) {
      return <Badge bg="warning" text="dark">Low Stock</Badge>;
    } else {
      return <Badge bg="success">In Stock</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        {error}
        <Button variant="outline-danger" className="ms-3" onClick={fetchStockItems}>
          Retry
        </Button>
      </Alert>
    );
  }

  return (
    <div>
      <Card className="mb-4">
        <Card.Header>
          <h2>Motorcycle Stock Inventory</h2>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text>🔍</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by brand, model, color, or manufacturer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={2}>
              <Form.Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Items</option>
                <option value="inStock">In Stock</option>
                <option value="outOfStock">Out of Stock</option>
                <option value="lowStock">Low Stock (≤1)</option>
              </Form.Select>
            </Col>
            <Col md={2}>
              <Form.Select
                value={selectedScale}
                onChange={(e) => setSelectedScale(e.target.value)}
              >
                <option value="all">All Scales</option>
                {availableScales.map((scale) => (
                  <option key={scale} value={scale}>
                    {scale}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={2}>
              <Button 
                variant="primary" 
                onClick={() => navigate('/add')}
                className="w-100"
              >
                ➕ Add New Item
              </Button>
            </Col>
            <Col md={2}>
              <Button 
                variant="outline-secondary" 
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('all');
                  setSelectedScale('all');
                  setSortField(null);
                  setSortDirection('asc');
                }}
                className="w-100"
              >
                🔄 Reset Filters
              </Button>
            </Col>
            <Col md={2}>
              <Button 
                variant="outline-info" 
                onClick={() => {
                  setSortField(null);
                  setSortDirection('asc');
                }}
                className="w-100"
                disabled={!sortField}
              >
                🔢 Reset Sort
              </Button>
            </Col>
          </Row>
          {sortField && (
            <Row className="mt-2">
              <Col>
                <small className="text-muted">
                  📊 Sorted by: <strong>{getColumnDisplayName(sortField)}</strong> 
                  ({sortDirection === 'asc' ? 'Ascending ↑' : 'Descending ↓'})
                </small>
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>

      <div className="table-responsive">
        <Table striped bordered hover style={tableStyle}>
          <thead className="table-dark">
            <tr>
              <th 
                style={sortableHeaderStyle}
                onClick={() => handleSort('stockQuantity')}
                className="sortable-header"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#495057'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
              >
                Status {getSortIcon('stockQuantity')}
              </th>
              <th 
                style={sortableHeaderStyle}
                onClick={() => handleSort('brand')}
                className="sortable-header"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#495057'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
              >
                Brand {getSortIcon('brand')}
              </th>
              <th 
                style={sortableHeaderStyle}
                onClick={() => handleSort('model')}
                className="sortable-header"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#495057'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
              >
                Model {getSortIcon('model')}
              </th>
              <th 
                style={sortableHeaderStyle}
                onClick={() => handleSort('scale')}
                className="sortable-header"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#495057'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
              >
                Scale {getSortIcon('scale')}
              </th>
              <th 
                style={sortableHeaderStyle}
                onClick={() => handleSort('color')}
                className="sortable-header"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#495057'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
              >
                Color {getSortIcon('color')}
              </th>
              <th 
                style={sortableHeaderStyle}
                onClick={() => handleSort('stand')}
                className="sortable-header"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#495057'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
              >
                Stand {getSortIcon('stand')}
              </th>
              <th 
                style={sortableHeaderStyle}
                onClick={() => handleSort('boxStatus')}
                className="sortable-header"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#495057'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
              >
                Box Status {getSortIcon('boxStatus')}
              </th>
              <th 
                style={sortableHeaderStyle}
                onClick={() => handleSort('stockQuantity')}
                className="sortable-header"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#495057'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
              >
                Stock Count {getSortIcon('stockQuantity')}
              </th>
              <th 
                style={sortableHeaderStyle}
                onClick={() => handleSort('salePrice')}
                className="sortable-header"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#495057'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
              >
                Sale Price (TL) {getSortIcon('salePrice')}
              </th>
              <th 
                style={sortableHeaderStyle}
                onClick={() => handleSort('etsyPrice')}
                className="sortable-header"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#495057'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
              >
                Etsy Price (€) {getSortIcon('etsyPrice')}
              </th>
              <th 
                style={sortableHeaderStyle}
                onClick={() => handleSort('etsy')}
                className="sortable-header"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#495057'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
              >
                ETSY {getSortIcon('etsy')}
              </th>
              <th 
                style={sortableHeaderStyle}
                onClick={() => handleSort('dolap')}
                className="sortable-header"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#495057'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
              >
                DOLAP {getSortIcon('dolap')}
              </th>
              <th 
                style={sortableHeaderStyle}
                onClick={() => handleSort('trendyol')}
                className="sortable-header"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#495057'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
              >
                TRENDYOL {getSortIcon('trendyol')}
              </th>
              <th 
                style={sortableHeaderStyle}
                onClick={() => handleSort('ciceksepeti')}
                className="sortable-header"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#495057'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
              >
                ÇİÇEKSEPETİ {getSortIcon('ciceksepeti')}
              </th>
              <th 
                style={sortableHeaderStyle}
                onClick={() => handleSort('website')}
                className="sortable-header"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#495057'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
              >
                WEBSITE {getSortIcon('website')}
              </th>
              <th 
                style={sortableHeaderStyle}
                onClick={() => handleSort('manufacturer')}
                className="sortable-header"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#495057'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
              >
                Manufacturer {getSortIcon('manufacturer')}
              </th>
              <th 
                style={sortableHeaderStyle}
                onClick={() => handleSort('condition')}
                className="sortable-header"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#495057'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
              >
                Condition {getSortIcon('condition')}
              </th>
              <th 
                style={sortableHeaderStyle}
                onClick={() => handleSort('wholesalePrice')}
                className="sortable-header"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#495057'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
              >
                Wholesale Price {getSortIcon('wholesalePrice')}
              </th>
              <th 
                style={sortableHeaderStyle}
                onClick={() => handleSort('notes')}
                className="sortable-header"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#495057'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
              >
                Notes {getSortIcon('notes')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((item) => (
              <tr 
                key={item.id} 
                className={item.stockQuantity === 0 ? 'table-danger' : ''}
              >
                <td>{getStockStatusBadge(item.stockQuantity)}</td>
                <td><strong>{item.brand}</strong></td>
                <td>{item.model}</td>
                <td><Badge bg="info">{item.scale || '1:18'}</Badge></td>
                <td>{item.color}</td>
                <td>{item.stand || '-'}</td>
                <td>{item.boxStatus || '-'}</td>
                <td>
                  <span className={item.stockQuantity === 0 ? 'text-danger fw-bold' : ''}>
                    {item.stockQuantity}
                  </span>
                </td>
                <td>₺{item.salePrice}</td>
                <td>€{item.etsyPrice}</td>
                <td style={platformColumnStyle}>
                  <Button
                    variant={(item.etsy || false) ? "success" : "outline-secondary"}
                    size="sm"
                    style={{ 
                      fontSize: '13px',
                      padding: '8px 12px',
                      fontWeight: 'bold',
                      minWidth: '90px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: '1'
                    }}
                    onClick={() => handlePlatformChange(item.id, 'etsy', !(item.etsy || false))}
                  >
                    {(item.etsy || false) ? "✓ ETSY" : "✗ ETSY"}
                  </Button>
                </td>
                <td style={platformColumnStyle}>
                  <Button
                    variant={(item.dolap || false) ? "success" : "outline-secondary"}
                    size="sm"
                    style={{ 
                      fontSize: '13px',
                      padding: '8px 12px',
                      fontWeight: 'bold',
                      minWidth: '90px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: '1'
                    }}
                    onClick={() => handlePlatformChange(item.id, 'dolap', !(item.dolap || false))}
                  >
                    {(item.dolap || false) ? "✓ DOLAP" : "✗ DOLAP"}
                  </Button>
                </td>
                <td style={platformColumnStyle}>
                  <Button
                    variant={(item.trendyol || false) ? "success" : "outline-secondary"}
                    size="sm"
                    style={{ 
                      fontSize: '13px',
                      padding: '8px 12px',
                      fontWeight: 'bold',
                      minWidth: '90px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: '1'
                    }}
                    onClick={() => handlePlatformChange(item.id, 'trendyol', !(item.trendyol || false))}
                  >
                    {(item.trendyol || false) ? "✓ TRENDYOL" : "✗ TRENDYOL"}
                  </Button>
                </td>
                <td style={platformColumnStyle}>
                  <Button
                    variant={(item.ciceksepeti || false) ? "success" : "outline-secondary"}
                    size="sm"
                    style={{ 
                      fontSize: '13px',
                      padding: '8px 12px',
                      fontWeight: 'bold',
                      minWidth: '90px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: '1'
                    }}
                    onClick={() => handlePlatformChange(item.id, 'ciceksepeti', !(item.ciceksepeti || false))}
                  >
                    {(item.ciceksepeti || false) ? "✓ ÇİÇEKSEPETİ" : "✗ ÇİÇEKSEPETİ"}
                  </Button>
                </td>
                <td style={platformColumnStyle}>
                  <Button
                    variant={(item.website || false) ? "success" : "outline-secondary"}
                    size="sm"
                    style={{ 
                      fontSize: '13px',
                      padding: '8px 12px',
                      fontWeight: 'bold',
                      minWidth: '90px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: '1'
                    }}
                    onClick={() => handlePlatformChange(item.id, 'website', !(item.website || false))}
                  >
                    {(item.website || false) ? "✓ WEBSITE" : "✗ WEBSITE"}
                  </Button>
                </td>
                <td>{item.manufacturer}</td>
                <td>{item.condition || '-'}</td>
                <td>₺{item.wholesalePrice}</td>
                <td>{item.notes || '-'}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => navigate(`/edit/${item.id}`)}
                    className="me-1"
                  >
                    ✏️ Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => confirmDelete(item)}
                  >
                    🗑️ Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {filteredItems.length === 0 && (
        <Alert variant="info" className="text-center">
          No items found matching your criteria.
        </Alert>
      )}

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{itemToDelete?.brand} {itemToDelete?.model}</strong>?
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StockTable;
