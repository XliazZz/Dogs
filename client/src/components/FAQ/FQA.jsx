const FAQ = () => {
  return(
    <div className="container p-5 pt-0"     
      style={{ 
        width: "100%",
        maxWidth: "1200px",
        backgroundColor: "#2a2a2a",
        height: "100vh"
    }}>
      <div className="d-flex justify-content-center pt-2 mb-1">
        <h1 className="text-white">Frequently Asked Questions</h1>
      </div>

      <div className="accordion mb-5" id="accordionExample">
        <div className="accordion-item ">
          <h2 className="accordion-header">
            <button className="accordion-button bg-black text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            How can I add a dogs to my favorites?
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>Above each country card</strong>, there is a button where you can add it to your <strong>favorites.</strong>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed bg-black text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            How can i create a new dog?
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              On the <strong>left side</strong> of the <strong>navigation bar</strong>, there is a <strong>button</strong> to go to create an dog.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed bg-black text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            How can I view the details of a dog?
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              By clicking on the <strong>button "More" </strong>of the card, you can view the details.
            </div>
          </div>
        </div>


        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed bg-black text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
            Can I search for dogs by their breed?          
            </button>
          </h2>
          <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>Yes</strong>, you can enter the <strong>name of the breed</strong> and it will be searched.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed bg-black text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
            Do I need to create an account to use all the functionalities of the page?
            </button>
          </h2>
          <div id="collapseSix" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>Yes</strong>, you need to<strong> create an account</strong> to enjoy all the options.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed bg-black text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
            Can I remove a dog from my favorites?
            </button>
          </h2>
          <div id="collapseSeven" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              Using the <strong>same button</strong> used to add it to favorites, you can remove it.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FAQ;