import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function App() {

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [category, setCategory] = useState('');
  const [showResults, setShowResults] = useState(false);

  const validate = (e) => {
    const { name, value } = e.target;

    if (!!value.match("^[0-9]*$")) {
      if (name === "weight") {
        setWeight(value);
      } else {
        setHeight(value);
      }

      setBmi('');
      setCategory('');
      setShowResults(false);

    } else {
      alert("Please enter a valid input");
      e.target.value = name === "weight" ? weight : height;
    }
  };

  const resetForm = () => {
    setWeight('');
    setHeight('');
    setBmi('');
    setCategory('');
    setShowResults(false);
  };

  const checkBMI = () => {
    if (weight && height) {
      const numericWeight = Number(weight);
      const numericHeight = Number(height) / 100;
      const bmiValue = numericWeight / (numericHeight * numericHeight);


      let bmiCategory = '';
      if (bmiValue < 18.5) {
        bmiCategory = 'Underweight';
      } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        bmiCategory = 'Normal weight';
      } else if (bmiValue >= 25 && bmiValue < 29.9) {
        bmiCategory = 'Overweight';
      } else {
        bmiCategory = 'Obesity';
      }

      setBmi(Math.round(bmiValue * 100) / 100);
      setCategory(bmiCategory);
      setShowResults(true);
    } else {
      alert("Please enter both weight and height.");
    }
  };


  const getImage = () => {
    if (showResults) {
      if (category === 'Underweight') {
        return "https://as1.ftcdn.net/v2/jpg/02/32/47/42/1000_F_232474258_5yr9FAWnXb8l8Uv9Dz3Fule2SSTABN06.jpg";
      } else if (category === 'Normal weight') {
        return "https://img.freepik.com/premium-vector/normal-weight-human-feet-scales-isolated-white-person-with-ideal-body-standing-weighing-machine-woman-legs-toes-with-manicure_91248-774.jpg";
      } else if (category === 'Overweight') {
        return "https://www.shutterstock.com/image-vector/overweight-man-standing-on-body-260nw-2249186219.jpg"; // Replace with actual image URL
      } else if (category === 'Obesity') {
        return "https://i.pinimg.com/736x/e8/5c/85/e85c85516b4b1f378a1444d8d47b3152.jpg";
      }
    }
    return "https://media.geeksforgeeks.org/wp-content/uploads/20231206171725/BMI-2.png";
  };

  return (
    <>
      <div className='container-fluid bg-black min-vh-100 d-flex justify-content-center align-items-center'>
        <div className="row w-100">
          <div className="col-sm-10 col-md-2 col-lg-3"></div>

          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <Card
              border="info"
              className='shadow-lg text-primary bg-dark mx-auto'
              style={{ width: '18rem' }}
            >
              <h1 className='p-2 text-center'>BMI CALCULATOR</h1>
              <Card.Img
                className='p-1 rounded'
                variant="top"
                src={getImage()}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body className='py-0'>
                <label className='mt-2'>
                  <h5 className='mb-1'>Weight</h5>
                  <input
                    className='form-control rounded'
                    type="text"
                    placeholder='Weight in kg'
                    name='weight'
                    value={weight}
                    onChange={(e) => validate(e)}
                  />
                </label>

                <label className='mt-2'>
                  <h5 className='mb-1'>Height</h5>
                  <input
                    className='form-control rounded'
                    type="text"
                    placeholder='Height in cm'
                    name='height'
                    value={height}
                    onChange={(e) => validate(e)}
                  />
                </label>

                {showResults && (
                  <>
                    <label className='mt-2'>
                      <h5 className='mb-1'>BMI</h5>
                      <input
                        className='form-control rounded mt-0'
                        type="text"
                        value={bmi}
                        placeholder='BMI'
                        readOnly
                      />
                    </label>

                    <label className='mt-2'>
                      <h5 className='mb-1'>Category</h5>
                      <input
                        className='form-control rounded mt-0'
                        type="text"
                        value={category}
                        placeholder='Category'
                        readOnly
                      />
                    </label>
                  </>
                )}

                <div className="d-flex mt-3">
                  <Button className='my-2' variant="success" onClick={checkBMI}>Check</Button>
                  <Button className='my-2 mx-3' variant="primary" onClick={resetForm}>Reset</Button>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="col-sm-10 col-md-2 col-lg-3"></div>
        </div>
      </div>
    </>
  );
}

export default App;
