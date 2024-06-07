import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

function UpdateScreen() {

    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const { id } = useParams();

    const updateQuote = async (id) => {
        try {
            await axios.put(`https://techplement-backend.vercel.app/api/update-quote/${id}`, { quote, author })
            .then(window.alert("Quote Updated"))
        } catch (error) {
            console.log(error);
        }
    }

    const [data, setData] = useState({});

    const getData = async (id) => {
        try {
            const res = await axios.get(`https://techplement-backend.vercel.app/api/get-a-quote/${id}`);
            if (res.status === 201) {
                setData(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData(id);
    }, [id])

    return (
        <Container>
            <div className="inner">
                <h1 className="text-white">Update Quote : </h1> <br />
                <form>
                    <textarea name="quote" rows="10" cols="500" defaultValue={data.quote} onChange={(e) => setQuote(e.target.value)} placeholder="Write Quote Here" className="form-control"
                        required>
                    </textarea> <br /><br />
                    <input type="text" name="author" defaultValue={data.author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author Name" className="form-control" required />
                    <button className="button1" onClick={() => updateQuote(id)} type="submit" id="newQ">Update</button>
                </form>
            </div>
        </Container>
    )
}

export default UpdateScreen;