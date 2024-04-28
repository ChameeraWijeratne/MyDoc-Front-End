import './contactUs.css';
import Topbar from '../../components/ui/topbar/Topbar';

export default function Home() {
  return (
    <div>
      <Topbar />
      <div className="contact-us-container">
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>
            If you have any questions or inquiries, feel free to reach out to
            us:
          </p>
          <ul>
            <li>Email: mydocofficial764@example.com</li>
            <li>Phone: +94 760078842</li>
          </ul>
          <div className="social-media">
            <h3>Connect with us on social media:</h3>
            <ul>
              <li>
                <a
                  href="https://www.facebook.com/example"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com/example"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/example"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/example"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
