import React, { useState } from 'react';
import '../Styles/ModalPage.scss'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'
import InnerImageZoom from 'react-inner-image-zoom'
import icon from '../Assests/staricon.png'
const ModalPage = ({ product }) => {
    const [selectedImage, setSelectedImage] = useState(product.images[0]);
    function getRelativeTime(dateString) {
        const now = new Date();
        const reviewDate = new Date(dateString);
        const diffInMs = now - reviewDate;

        const seconds = Math.floor(diffInMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        if (years > 0) {
            return `${years} yr${years > 1 ? 's' : ''} ${months % 12 > 0 ? `${months % 12} mon` : ''}`;
        } else if (months > 0) {
            return `${months} mon ${days % 30 > 0 ? `${days % 30} days` : ''}`;
        } else if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''}`;
        } else if (hours > 0) {
            return `${hours} hr${hours > 1 ? 's' : ''}`;
        } else if (minutes > 0) {
            return `${minutes} min${minutes > 1 ? 's' : ''}`;
        } else {
            return `${seconds} sec${seconds > 1 ? 's' : ''}`;
        }
    }

    return (
        <>
            <div className='modal-page row w-100'>
                <div className='col-md-6'>
                    <div className="scroll-container d-flex">
                        <div>
                            {product.images.map((image, index) => (
                                <div key={index}>
                                    <img
                                        src={image}
                                        alt={`${product.title} - ${index + 1}`}
                                        onClick={() => setSelectedImage(image)}
                                        className="product-display"
                                        loading="lazy"
                                        style={{
                                            cursor: 'pointer',
                                            border: selectedImage === image ? '2px solid rgba(24, 119, 242, 1)' : '2px solid white',
                                            borderRadius: '4px',
                                            padding: '2px',
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                        <div>
                            <InnerImageZoom className='product-image-modal' src={selectedImage} />
                        </div>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className="modal-product-details">
                        <h1 className="modal-product-title">{product.title}</h1>
                        <p className="modal-product-description">{product.description}</p>
                        <div className="modal-product-meta">
                            <div className='row w-100  p-0'>
                                <div className='data-flex my-2 col-md'><span class="material-symbols-outlined me-2">payments</span><strong>Price:</strong> ${product.price.toFixed(2)}</div>
                                <div className='data-flex my-2 col-md'><span class="material-symbols-outlined me-2">monitoring</span><strong>Discount:</strong> {product.discountPercentage}%</div>
                            </div>
                            <div className='row w-100 p-0'>
                                <div className='data-flex my-2 col-md'><span class="material-symbols-outlined me-2">star_rate</span><strong>Rating:</strong> {product.rating} / 5</div>
                                <div className='data-flex my-2 col-md'><span class="material-symbols-outlined me-2">inventory</span><strong>Stock:</strong> {product.stock > 0 ? product.stock : 'Out of Stock'}</div>
                            </div>
                            <div className='data-flex'><span class="material-symbols-outlined me-2">category_search</span><strong>Category:</strong> {product.category}</div>
                            <div className='data-flex'><span class="material-symbols-outlined me-2">production_quantity_limits</span><strong>Warranty:</strong> {product.warrantyInformation}</div>
                            <div className='data-flex'><span class="material-symbols-outlined me-2">delivery_truck_speed</span><strong>Shipping:</strong> {product.shippingInformation}</div>
                            <div className='data-flex'><span class="material-symbols-outlined me-2">assignment_return</span><strong>Return Policy:</strong> {product.returnPolicy}</div>
                        </div>
                        <div className="accordion my-3" id="accordionFlushExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseOne"
                                        aria-expanded="false"
                                        aria-controls="flush-collapseOne"
                                    >
                                        Reviews
                                    </button>
                                </h2>
                                <div
                                    id="flush-collapseOne"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionFlushExample"
                                >
                                    <div className="accordion-body">
                                        {product.reviews.map((review, index) => (
                                            <div key={index} className="modal-review-item">
                                                <div className="review-content">
                                                    <div className="review-rating"><span >{review.rating}  </span>
                                                        <img width={"20px"} className='ms-1' src={icon} alt="icon"/></div>
                                                    <span className="review-comment">{review.comment}</span>
                                                </div>
                                                <div className="review-meta">
                                                    <strong>{review.reviewerName}</strong>  <span className='font-time'> {getRelativeTime(review.date)}</span>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalPage;
