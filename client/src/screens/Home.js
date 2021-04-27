import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Home = () => {
    return (
        <div className="home-body">
            <h1>MedCabinet - your online medical record keeper</h1>
            <section style={{marginTop:"3rem"}}>
                <div className="flex-container">
                    <div className="col-md-12 col-lg-12 col-xs-12">
                        <h5>Safekeep your Health Records</h5>
                    </div>
                    <div className="col-md-6 col-lg-12 col-xs-12">
                        <p>Store your medical records online and securely</p>
                    </div>
                </div>
                <div className="flex-container">
                    <div className="col-md-12 col-lg-12 col-xs-12">
                        <h5>View and Manage Health Records</h5>
                    </div>
                    <div className="col-md-6 col-lg-12 col-xs-12">
                        <p>View, download, and share your health records</p>
                    </div>
                </div>
            </section>
        </div>
)
}

export default Home ;