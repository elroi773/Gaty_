import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Icons = {
  kakao: <img src="/src/assets/kakao.svg" alt="카카오" width={18} height={18} />,
  instagram: <img src="/src/assets/instagram.svg" alt="인스타그램" width={18} height={18} />,
  discord: <img src="/src/assets/discord.svg" alt="디스코드" width={18} height={18} />,
  github: <img src="/src/assets/github.svg" alt="깃허브" width={18} height={18} />,
};

const CameraIcon = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="#888" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6H16.83L15.41 4.59C15.03 4.21 14.52 4 14 4H10C9.48 4 8.97 4.21 8.59 4.59L7.17 6H4C2.9 6 2 6.9 2 8V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6ZM20 18H4V8H20V18ZM12 9C9.79 9 8 10.79 8 13C8 15.21 9.79 17 12 17C14.21 17 16 15.21 16 13C16 10.79 14.21 9 12 9ZM12 15C10.9 15 10 14.1 10 13C10 11.9 10.9 11 12 11C13.1 11 14 11.9 14 13C14 14.1 13.1 15 12 15Z" />
  </svg>
);

// --- Styled Components ---
const Page = styled.section`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
`;

const Card = styled.div`
  width: 650px;
  background: #fff;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  /* 화면 왼쪽으로 이동 */
  margin-left: 50px; /* 필요에 따라 px 조정 가능 */
`;

const SmallNote = styled.p`
  font-size: 0.8rem;
  color: #888;
  margin-top: 4px;
  margin-bottom: 0;
`;


const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
  font-weight: 700;
  color: #333;
  margin: 0;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 6px;
`;

const RequiredMark = styled.span`
  color: #ff4d4f;
  margin-left: 4px;
`;

const BaseInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border-radius: 10px;
  border: 2px solid #ddd;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #FE8445;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  resize: none;
  font-family: inherit;
  padding: 12px;
  font-size: 1rem;
  border-radius: 10px;
  border: 2px solid #ddd;
  outline: none;

  &:focus {
    border-color: #FE8445;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 6px 0;
`;

const MiddleRow = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;
`;

const ProfileCol = styled.div`
  width: 180px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfilePreview = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 8px;
  border: 2px dashed #ccc;
  background-color: #f9f9f9;
  background-image: ${({ img }) => img ? `url(${img})` : 'none'};
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: border-color 0.2s, opacity 0.2s;

  &:hover {
    border-color: #FE8445;
    opacity: 0.9;
  }
`;

const ProfileIcon = styled.span`
  z-index: 2;
`;

const RightCol = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SocialGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SocialBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  border-radius: 10px;
  font-size: 0.9rem;
  cursor: pointer;
  border: 2px solid #ddd;
  background: ${({ active }) => active ? '#EEF5FF' : 'white'};
  color: ${({ active }) => active ? '#FE8445' : 'inherit'};

  &:hover {
    background: #fafafa;
  }
`;

const InterestsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const InterestBtn = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #ddd;
  font-size: 0.9rem;
  cursor: pointer;
  background: ${({ selected }) => selected ? '#FE8445' : 'white'};
  color: ${({ selected }) => selected ? 'white' : 'inherit'};

  &:hover {
    background: ${({ selected }) => selected ? '#FE8445' : '#f6f6f6'};
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  background: #FE8445;
  color: white;
  font-weight: 700;
  font-size: 1.05rem;
  border: none;
  cursor: pointer;

  &:hover {
    background: #FE8445;
  }
`;
const EmailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const EmailInput = styled.input`
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  border: 2px solid #ddd;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #FE8445;  
    }
`;

const EmailDomainInput = styled.input`
  width: 140px;
  padding: 12px;
  border-radius: 10px;
  border: 2px solid #ddd;
  background-color: #f5f5f5;
  color: #555;
  pointer-events: none; /* 수정 불가 */
`;


// --- Component ---
export default function Signup() {
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState(null);
  const [interests, setInterests] = useState([]);
  const [showSocialInput, setShowSocialInput] = useState(null);
  const [inputs, setInputs] = useState({
    name: '',
    password: '',
    passwordConfirm: '',
    emailId: '',
    intro: '',
    social: { kakao: '', instagram: '', discord: '', github: '' }
  });

  const interestCategories = ['프론트엔드', '백엔드', '디자인', 'JAVA', '앱 개발', 'SpringBoot', 'Python', 'HTML', 'Git', 'React', 'Mysql', 'JavaScript', 'supabase', 'Flutter', '웹 개발', '협업/프로젝트', 'TypeScript'];

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setProfileImg(reader.result);
    reader.readAsDataURL(file);
  };

  const toggleInterest = (category) => {
    setInterests(prev => prev.includes(category) ? prev.filter(i => i !== category) : [...prev, category]);
  };

  const handleSocialClick = (snsKey) => {
    setShowSocialInput(prev => prev === snsKey ? null : snsKey);
  };

  const handleSubmit = () => {
    if (!inputs.name || !inputs.password || !inputs.emailId) {
      alert("필수 정보를 모두 입력해주세요.");
      return;
    }
    if (inputs.password !== inputs.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const email = `${inputs.emailId}@e-mirim.hs.kr`;
    const payload = { ...inputs, email, interests, profileImg };
    console.log("회원가입 payload:", payload);
    alert(`환영합니다, ${inputs.name}님! 회원가입이 완료되었습니다.`);
    navigate('/');
  };

  const snsList = [
    { label: '카카오톡', key: 'kakao', icon: Icons.kakao },
    { label: '인스타그램', key: 'instagram', icon: Icons.instagram },
    { label: '디스코드', key: 'discord', icon: Icons.discord },
    { label: '깃허브', key: 'github', icon: Icons.github },
  ];

  return (
    <Page>
      <Card>
        <Title>회원가입</Title>

        <FormSection>
          <InputGroup>
            <Label>이름 <RequiredMark>*</RequiredMark></Label>
            <BaseInput
              placeholder="실명을 입력해주세요"
              value={inputs.name}
              onChange={e => setInputs({ ...inputs, name: e.target.value })}
            />
          </InputGroup>

          <InputGroup>
            <Label>이메일 <RequiredMark>*</RequiredMark></Label>
            <EmailRow>
              <EmailInput
                placeholder="이메일 아이디"
                value={inputs.emailId}
                onChange={(e) => setInputs({ ...inputs, emailId: e.target.value })}
              />
              <span>@</span>
              <EmailDomainInput value="e-mirim.hs.kr" readOnly />
            </EmailRow>
          </InputGroup>


          <InputGroup>
            <Label>비밀번호 <RequiredMark>*</RequiredMark></Label>
            <BaseInput
              type="password"
              placeholder="비밀번호 입력"
              value={inputs.password}
              onChange={e => setInputs({ ...inputs, password: e.target.value })}
            />
          </InputGroup>

          <InputGroup>
            <Label>비밀번호 확인 <RequiredMark>*</RequiredMark></Label>
            <BaseInput
              type="password"
              placeholder="비밀번호 재입력"
              value={inputs.passwordConfirm}
              onChange={e => setInputs({ ...inputs, passwordConfirm: e.target.value })}
            />
          </InputGroup>
        </FormSection>

        <Divider />

        <MiddleRow>
          <ProfileCol>
            <Label>프로필 사진</Label>
            <label htmlFor="profile-upload">
              <ProfilePreview img={profileImg}>
                {!profileImg && <ProfileIcon>{CameraIcon}</ProfileIcon>}
              </ProfilePreview>
            </label>
            <input id="profile-upload" type="file" accept="image/*" onChange={handleImageUpload} style={{display:'none'}}/>
          </ProfileCol>

          <RightCol>
            <InputGroup>
              <Label>SNS 계정 연동 (선택)</Label>
              <SocialGrid>
                {snsList.map(sns => (
                  <SocialBtn
                    key={sns.label}
                    type="button"
                    active={showSocialInput === sns.label}
                    onClick={() => handleSocialClick(sns.label)}
                  >
                    {sns.icon} {sns.label}
                  </SocialBtn>
                ))}
              </SocialGrid>
              {showSocialInput && (
                <BaseInput
                  placeholder={`${showSocialInput} ID/링크 입력`}
                  style={{marginTop: 10, borderColor:'#FE8445'}}
                  onChange={e => {
                    const snsItem = snsList.find(s => s.label === showSocialInput);
                    if(snsItem) setInputs(prev => ({ ...prev, social: { ...prev.social, [snsItem.key]: e.target.value } }));
                  }}
                />
              )}
            </InputGroup>
          </RightCol>
        </MiddleRow>

        <Divider />

        <InputGroup>
          <Label>자기소개</Label>
          <TextArea
            placeholder="ex)성장하고 싶은 꼬마 개발자입니다."
            value={inputs.intro}
            onChange={e => setInputs({ ...inputs, intro: e.target.value })}
          />
        </InputGroup>

        <InputGroup>
          <Label>관심분야 (다중 선택 가능)</Label>
          <SmallNote>본인의 관심분야를 골라주세요.</SmallNote>
          <InterestsWrap>
            {interestCategories.map(cat => (
              <InterestBtn
                key={cat}
                type="button"
                selected={interests.includes(cat)}
                onClick={() => toggleInterest(cat)}
              >
              {cat}
              </InterestBtn>
            ))}
          </InterestsWrap>
        </InputGroup>


        <SubmitBtn onClick={handleSubmit}>회원가입 완료</SubmitBtn>
      </Card>
    </Page>
  );
}