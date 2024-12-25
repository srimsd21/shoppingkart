import React, { useEffect, useState } from 'react';
import Header from '../Layouts/Header';
import { useSelector } from 'react-redux';
import { fetchCategoriesSelect } from '../Services/Apicall';
import '../Styles/LandingPage.scss';
import { useNavigate } from 'react-router-dom';
import icon from '../Assests/staricon.png';
import ModalPage from './ModalPage';

const LandingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);  
  const [products, setProducts] = useState([]);
  const { categoryType } = useSelector((state) => state.category);

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (!data) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (categoryType?.slug) {
      const fetchCall = async () => {
        try {
          setLoading(true);  
          const result = await fetchCategoriesSelect({ cat: categoryType?.slug });
          setProducts(result?.products || []);
        } catch (err) {
          console.error('Error fetching categories:', err);
        } finally {
          setLoading(false);  
        }
      };
      fetchCall();
    }
  }, [categoryType]);

  return (
    <div>
      <Header />
      <div className='container'>
        {loading ? (
          <div className="loading-container d-flex justify-content-center align-items-center" style={{height:"50vh"}}>
            <div className="spinner-border primary" role="status">
              <span className="visually-hidden"></span>
            </div>
          </div>
        ) : (
          products.length > 0 && (
            <>
              <div className='d-flex justify-content-between w-100 px-2'>
                <div className=' d-flex'>
                  <div className='fw-bold primary'>Category: </div>
                  <div className='ms-2' style={{ textTransform: "capitalize" }}>{products[0]?.category}</div>
                </div>
                <div className=' d-flex'>
                  <div className='fw-bold primary'>Product count: </div>
                  <div className='ms-2'>{products.length}</div>
                </div>
              </div>
              <div className='row w-100 m-auto landingpage'>
                {products.map((product) => (
                  <div className="col-md-4" key={product.id}>
                    <div className='product-card' type="button"
                      data-bs-toggle="modal"
                      data-bs-target={`#exampleModal-${product.id}`}>
                      <div className='image-container'>
                        <img
                          src={product.images[product.currentImageIndex || 0]}
                          alt={product.title}
                          className="product-image"
                          loading="lazy"
                        />
                      </div>
                      <div className="product-info">
                        <h3 className="product-title">{product.title}</h3>
                        <div className="product-price">
                          <span className="price">${product.price.toFixed(2)}</span>
                          <span className="discount">({product.discountPercentage}%)</span>
                        </div>
                        <div className='row'>
                          <div className="product-rating col-md-6">
                            <div>{product.rating}</div>
                            <img width={"20px"} className='ms-1' src={icon} alt="icon" />
                          </div>
                          <div className='col-md-6 d-flex justify-content-end'>
                            <div
                              className="product-availability"
                              style={{
                                backgroundColor: product.availabilityStatus === 'Low Stock'
                                  ? '#eaff64'
                                  : product.availabilityStatus === 'Out of Stock'
                                    ? '#ffa6a6'
                                    : product.availabilityStatus === 'In Stock'
                                      ? '#7eff7e'
                                      : 'transparent'
                              }}
                            >
                              {product.availabilityStatus}
                            </div>
                          </div>
                        </div>
                        <div className="product-shipping d-flex align-items-center">
                          <span className="material-symbols-outlined me-2">local_shipping</span>
                          <span>{product.shippingInformation}</span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id={`exampleModal-${product.id}`}
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-xl modal-dialog-centered">
                        <div className="modal-content">
                          <div className='d-flex justify-content-end mt-3'>
                            <button type="button" className="btn-close mx-4" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                            <ModalPage product={product} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default LandingPage;
