import imaGray from "../../assets/placeholderCard.png";

const CardLoading = () => {
  return(
    <div className="card h-100 p-1"
      style={{ width: '22rem' }}
    >

      <img 
        src={imaGray}
        alt="" 
        className="card-img-top img-fluid" 
        style={{ objectFit: 'cover', height: '350px' }} 

      />

      <div className="card-body d-flex flex-column">
        <h1 className="card-title placeholder-glow">
          <span className="placeholder col-8"></span>
        </h1>

        <div className="mt-auto">
          <a class="btn btn-primary w-100 disabled placeholder col-6" aria-disabled="true"></a>
        </div>
      </div>

    </div>    
  );
};

export default CardLoading