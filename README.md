# 인트로

- 작년에 진행했던 프로젝트인 "Nas Server"를 1년이 지나고 봤을때, 유지보수를 하려면 전부 바꿔야할 정도로 부실한 부분이 많았고, 현재의 기술스택과 설계 지식을 활용해서 버전업을 하기로 했습니다.
- 스펙상 가정용 컴퓨터만으로는 실행할 수 없는 프로젝트가 되었지만, "Nas Server" 프로젝트를 개선하는 것이 목표였기 때문에 프로젝트 명을 그대로 사용해서 "Nas Server v2" 로 설정했습니다.

# 기술스택

## 프론트엔드

<table>
	<tr>
		<td> 
			<img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566879300/noticon/fvty9lnsbjol5lq9u3by.svg" width="80px" height="80px"/>
		</td>
		<td>
			<img src="https://github.com/nextauthjs/next-auth/blob/main/docs/static/img/logo/logo.png?raw=true" width="80px" height="80px"/>
		</td>
		<td>
			<img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566913457/noticon/eh4d0dnic4n1neth3fui.png" width="80px" height="80px"/>
		</td>
		<td>
			<img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1669720599/noticon/xg13hlex6bu8mu182b5y.png" width="80px" height="80px"/>
		</td>
		<td>
			<img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1567749614/noticon/zgdaxpaif5ojeduonygb.png" width="80px" height="80px"/>
		</td>
	</tr>
	<tr>
		<td>Next.js v12</td>
		<td>Next Auth</td>
		<td>Typescript</td>
		<td>React Query</td>
		<td>Redux</td>
	</tr>
</table>

## 백엔드

<table>
	<tr>
		<td>
			<img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1657197520/noticon/hfntj9olqx1jeky3rdkt.png" width="80px" height="80px"/>
		</td>
		<td>
			<img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1694089639/noticon/ox4ngdartf1uzusjhcqx.png" width="80px" height="80px"/>
		</td>
		<td> 
			<img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566913958/noticon/uoqjdixts4lwsgtsa1pd.png" width="80px" height="80px"/>
		</td>
	</tr>
	<tr>
		<td>Lambda</td>
		<td>API Gateway</td>
		<td>Firebase</td>
	</tr>
</table>

## 배포

<table>
	<tr>
		<td>
			<img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566914173/noticon/kos1xkevxtr81zgwvyoe.svg" width="80px" height="80px"/>
		</td>
		<td>
			<img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566798146/noticon/lku5cppzh8r7awwsmmko.png" width="80px" height="80px"/>
		</td>
		<td>
			<img src="https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/icons/pm2.png" width="80px" height="80px"/>
		</td>
	</tr>
	<tr>
		<td>EC2</td>
		<td>NGINX</td>
		<td>PM2</td>
	</tr>
</table>

# 프로젝트

- 배포 : https://www.ikiningyou.com
- Github : https://github.com/jwonp/nas-server-frontend-v2
- ( nas server v1 : https://github.com/jwonp/nas-server-frontend )

# 아키텍처

![nas-server-v2 아키텍처.jpg](https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/NasServerV2/nas-server-v2+%E1%84%8B%E1%85%A1%E1%84%8F%E1%85%B5%E1%84%90%E1%85%A6%E1%86%A8%E1%84%8E%E1%85%A5.jpg)

# DB - Firebase

```
{
	// collection
	users:[
		{
			name: string,
			icon: string,
			username: string,
			password: {
				ciphertext: string,
				ephemPublicKey: string,
				iv: string,
				mac: string
			},
			phone: string,
			createTime: timestamp,

			// collection
			volume:{
				max: number,
				now: number
			},

			// collection
			storage: [
				{
					directory: string,
					fileName: string,
					key: string,
					size: number,
					type: "file" | "image" | "video" | "folder",
					uploadTime: number
				}
			]
		}
	]
}
```

# 주요 로직 시퀀스 다이어그램

![로그인.png](https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/NasServerV2/%EC%8B%9C%ED%80%80%EC%8A%A4+%EB%8B%A4%EC%9D%B4%EC%96%B4%EA%B7%B8%EB%9E%A8/%E1%84%85%E1%85%A9%E1%84%80%E1%85%B3%E1%84%8B%E1%85%B5%E1%86%AB.png)

![파일 업로드.png](https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/NasServerV2/%EC%8B%9C%ED%80%80%EC%8A%A4+%EB%8B%A4%EC%9D%B4%EC%96%B4%EA%B7%B8%EB%9E%A8/%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AF+%E1%84%8B%E1%85%A5%E1%86%B8%E1%84%85%E1%85%A9%E1%84%83%E1%85%B3.png)

![파일 삭제.png](https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/NasServerV2/%EC%8B%9C%ED%80%80%EC%8A%A4+%EB%8B%A4%EC%9D%B4%EC%96%B4%EA%B7%B8%EB%9E%A8/%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AF+%E1%84%89%E1%85%A1%E1%86%A8%E1%84%8C%E1%85%A6.png)

![파일 불러오기.png](https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/NasServerV2/%EC%8B%9C%ED%80%80%EC%8A%A4+%EB%8B%A4%EC%9D%B4%EC%96%B4%EA%B7%B8%EB%9E%A8/%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AF+%E1%84%87%E1%85%AE%E1%86%AF%E1%84%85%E1%85%A5%E1%84%8B%E1%85%A9%E1%84%80%E1%85%B5+%E1%84%87%E1%85%A7%E1%86%AB%E1%84%80%E1%85%A7%E1%86%BC%E1%84%92%E1%85%AE.png)

# Lighthouse 보고서

![Lighthouse.png](https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/NasServerV2/%EC%8B%9C%ED%80%80%EC%8A%A4+%EB%8B%A4%EC%9D%B4%EC%96%B4%EA%B7%B8%EB%9E%A8/Lighthouse.png)

# 프로젝트 개발 히스토리

## 파일 탐색기 구현

#### 배경

- 임시 계정 스토리지에 기본으로 포함시킬 파일, 폴더를 관리하기 위해 아래와 같이 파일 탐색기를 구현할 필요가 있었습니다.

![finder.png](https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/NasServerV2/%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AF+%E1%84%90%E1%85%A1%E1%86%B7%E1%84%89%E1%85%A2%E1%86%A8%E1%84%80%E1%85%B5.png)

- 이때, 폴더 안에 폴더나 파일을 계속 생성하는 경우에 DOM을 어떻게 관리해야할지 정할 필요가 있었습니다.

#### 문제 해결

- 실질적인 파일들의 state는 Array로 관리하고, 이를 Object -> Entry의 변환 과정을 걸쳐서 랜더링 하는 방식으로 파일 탐색기를 구현했습니다.
- 파일 리스트의 블록을 생성하는 JSX 컴포넌트는 재귀형으로 호출되어서 하나의 컴포넌트로 파일 리스트를 구현할 수 있게 설계했습니다.

![itemBarList.png](https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/NasServerV2/%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AF+%E1%84%90%E1%85%A1%E1%86%B7%E1%84%89%E1%85%A2%E1%86%A8%E1%84%80%E1%85%B5+%E1%84%82%E1%85%A9%E1%84%83%E1%85%B3+%E1%84%92%E1%85%AA%E1%84%89%E1%85%A1%E1%86%AF%E1%84%91%E1%85%AD.png)

#### 결과

- 폴더 안에 폴더를 계속 생성해도 상위 폴더안에 하위 폴더를 정상적으로 렌더링 할 수 있었습니다.

![howToBeCreatedItemBar.png](https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/NasServerV2/%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AF+%E1%84%90%E1%85%A1%E1%86%B7%E1%84%89%E1%85%A2%E1%86%A8%E1%84%80%E1%85%B5+%E1%84%89%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A5.jpg)

![FinderResult.png](https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/NasServerV2/%E1%84%8B%E1%85%B5%E1%86%B7%E1%84%89%E1%85%B5+%E1%84%80%E1%85%A8%E1%84%8C%E1%85%A5%E1%86%BC+%E1%84%8E%E1%85%A9%E1%84%80%E1%85%B5+%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AF.png)

## React-query 최적화

#### 배경

- react-query의 useQuery는 efetchOnMount, refetchOnWindowFocus 같은 refetch 관련 옵션들이 기본적으로 설정되어 있기 때문에, 가져오는 데이터에 따라 이 설정을 끌 필요가 있습니다.
- 이를 관리하지 않으면 주기적으로 fetch를 하는데, lambda나 firebase의 요금 산정 기준에는 GET 요청 수도 포함되어 있기 때문에 무의미한 요금이 발생하게 됩니다.

#### 문제 해결

- 사용자가 한 번 설정하면 바뀌지 않는 사용자 아이콘 같은 경우에는 refetch로 확인 할 필요가 없기 때문에 refetch 관련 옵션을 전부 false로 설정, staleTime을 Infinity로 설정했습니다.

![headerUserIcon.png](https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/NasServerV2/%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%8C%E1%85%A1+%E1%84%8B%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8F%E1%85%A9%E1%86%AB.png)

- 파일리스트는 사용자가 파일이나 폴더를 CRUD 할 경우에만 변경이 있고, 저장용량같은 경우는 파일이 추가, 삭제 될 경우에만 변경이 있습니다.
- 하지만, 여러 기기에서 동시에 로그인해서 이러한 작업을 하는 경우를 생각해서 refchOnWindowFocus만 always로 설정하고 나머지는 false처리 했습니다.

![GetRequestExample.png](https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/NasServerV2/%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AF%E1%84%85%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3+%E1%84%8C%E1%85%A5%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%85%E1%85%A3%E1%86%BC.png)

#### 결과

- 페이지 내에서 필요하진 않지만 주기적으로 refetch하는 것을 최소화하여 약 80%의 요청을 줄일 수 있었습니다.

## 파일 목록 불러오기 최적화

#### 배경

- 파일 목록을 가져오려면
- URL이 나타내는 Directory가 유효한가(해당 경로가 존재하는가)? 를 검사하면서, URL의 경로를 폴더명으로 변환하고
  - `GET /storage/directory/history`
  - 폴더명 변환 예시) `https://.../storage/0d750e26-2012-415c-9c59-324062837496/dc32aa8c-efce-4737-b70e-ae15a68893b1` 에서
  - `/0d750e26-2012-415c-9c59-324062837496/dc32aa8c-efce-4737-b70e-ae15a68893b1` 부분을 `parameter`로 보내서
  - `/내 드라이브/문서/다운로드` 와 같이 실제로 표시되는 폴더 이름으로 변환
- Directory에 있는 파일을 불러옵니다.
  - `GET /storage/item `
- 두 개의 요청으로 나뉘어져 있어서 RESTful API의 stateless의 성질을 지키기 위해서는 `GET /storage/item` 요청에서도 directory가 유효한지 검사해야 했습니다.
- 중복되어 검사가 이루어지기 때문에, 그만큼 파일 목록을 불러오는 시간이 늦어졌습니다.

#### 문제 해결

- `React-query`는 `Query key`가 같으면, 다른 두 컴포넌트에서 `useQuery`를 사용해도 같은 요청으로 처리합니다.
- 이를 활용해서 `GET /storage/directory/history` 를 요청하던 컴포넌트를 같은 `Query key`의 `GET /storage/item` 를 요청하도록 변경했습니다.
- 그리고 `GET /storage/item `에서 `GET /storage/directory/history` 의 역할을 같이 하도록 수정했습니다.

#### 결과

- 2번의 요청을 1번의 요청으로 줄여서 실제 응답시간을 평균적으로 212ms 에서 100ms 로 53% 절약할 수 있었습니다.

|                     | 개선전 | 개선후 |
| ------------------- | ------ | ------ |
| 실제 응답시간(평균) | 212ms  | 100ms  |
| 시간 감소 비율      | 0%     | 53%    |

- 파일 불러오기 개선 전/후 시퀀스 다이어그램

<div>
	<img src="https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/NasServerV2/%EC%8B%9C%ED%80%80%EC%8A%A4+%EB%8B%A4%EC%9D%B4%EC%96%B4%EA%B7%B8%EB%9E%A8/%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AF+%E1%84%87%E1%85%AE%E1%86%AF%E1%84%85%E1%85%A5%E1%84%8B%E1%85%A9%E1%84%80%E1%85%B5.png"  height="300px"/>
	<img src="https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/NasServerV2/%EC%8B%9C%ED%80%80%EC%8A%A4+%EB%8B%A4%EC%9D%B4%EC%96%B4%EA%B7%B8%EB%9E%A8/%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AF+%E1%84%87%E1%85%AE%E1%86%AF%E1%84%85%E1%85%A5%E1%84%8B%E1%85%A9%E1%84%80%E1%85%B5+%E1%84%87%E1%85%A7%E1%86%AB%E1%84%80%E1%85%A7%E1%86%BC%E1%84%92%E1%85%AE.png"  height="300px"/>
</div>

---

## V1 -> V2 변경점

### React Query, Next.js에서 QueryClient 사용

#### 배경

- `React Query`의 Getting Started에서는 `QueryClientProvider`에 client를 `new QueryClient()` 로 생성해서 제공하고 있습니다.
- 하지만 `Next.js`에서 같은 방식으로 하면, url이 바뀔때마다 정상적으로 캐싱이 되지 않았습니다.

#### 문제 해결

- `Next.js`의 경우 url이 바뀔때마다 Root Component인 `App`를 `body` 태그 이하의`<div id="__next">`에 복사합니다
- 그렇기 때문에 `App` 에서 `new QueryClient()` 로 생성해서 Provider에 제공하면 매번 새로 생성하게 됩니다.
- 이를 해결하기 위해 `useState`를 사용했습니다.

#### 해결

- `useState` 의 첫번째 인자로 `QuertClient` 객체를 Provider에 제공한다면 setter를 사용하지 않는 이상 값이 바뀌지 않기 때문에 url이 바뀌어도 캐싱이 제대로 이루어지는 것을 확인할 수 있었습니다.

### 파일 저장 공간을 EBS에서 S3로 변경

#### 배경

- 이전 버전에서는 유저의 파일을 저장할 때, `EC2` 인스턴스에서 사용하는 `EBS`에 저장했기 때문에 유저가 늘어날수록 AWS 비용이 급격하게 증가하는 문제가 있었습니다.

#### 문제 해결

- S3에 파일을 저장하는 시스템으로 바꿔야했고, v2를 개발하면서 `aws sdk`를 사용해서 S3에 파일을 저장하도록 변경했습니다.
- `pre-signed url`를 사용해서 `S3`에 파일을 저장하고, `S3`에 저장된 파일의 ID key과 함께 `Firebase`에 메타 데이터를 저장해서 유저가 클라우드 스토리지 내 파일을 관리할 수 있게 설계했습니다.
  - - `pre-signed url`을 사용한 이유
    * 만약 `pre-signed url`을 사용하지 않을 경우, 업로드할 파일은 브라우저 -> `Lambda` -> `S3`의 단계를 거치게 됩니다.
    * MB~GB 단위의 파일이 두 번 이동하는 것은 많은 리소스를 소비하기 때문에 브라우저에서 `S3`로 바로 파일을 업로드하는 것이 효율적입니다.
    * 그렇기 때문에 안전하게 파일을 직접 업로드/다운로드 할 수 있는 `pre-signed url` 방식을 채택했습니다.

#### 결과

- 가격이 높은 `EBS`에서 `S3`로 저장소를 변경한 결과, 같은 서비스를 이전대비 연평균 최소 35% 수준의 비용으로 배포할 수 있게 되었습니다.

### django에서 AWS lambda로 migration

#### 배경

- 프리티어 내 `EC2`로 `Next.js + django` 를 배포하는 과정에서 램 부족으로 인한 프리징이 자주 발생했습니다.
- 또, `Javascript와` `Python`을 사용해야 하는데,` Python`에 대한 이해도가 상대적으로 낮아서 유지 보수에도 시간이 배로 소모되는 이슈도 있었습니다.
- 두 가지 이유로 `EC2`에서는 `Next.js` 만 배포하고, 다른 `AWS` 서비스에서 `Javascript`를 사용할 수 있는 백엔드 시스템을 조사한 결과 `Lambda`를 사용하는 것이 가장 적합하다고 생각했습니다.

#### 문제 해결

- 원활하게 `Lambda` 환경을 구축하기 위해 `Serverless Framework`를 사용했습니다.
- 로그인 로직이 `Next.js`의 Server Side에서 `Next-Auth`로 인증/인가가 처리되기 때문에, `Lambda`에 요청을 할 때는 별도의 인증/인가 처리가 이루어지지 않는 다는 것을 깨달았습니다.
  - 이를 해결하기 위해 `Next.js`의 Server Side에서 인가된 사용자의 정보를 담은 `jwt`를 생성했습니다.
  - `API Gateway Lambda Authorizer with Simple-Response` 를 통해 `jwt`를 검사하게 설정을 했고, `Next-Auth` 로 인가가 되지 않는 사용자의 요청을 거부하는 방식으로 이를 해결했습니다.

#### 결과

- 배포 과정 램 부족으로 인한 프리징 현상이 발생하지 않게 되었습니다. 이로 인해 EC2를 재부팅하는 식으로 이를 해결하는 시간을 소모하지 않게 되었습니다.
- V1는 개발 기간이 약 98일, V2는 약 53일 소요 되었습니다. 따라서, `Lambda`로 migration을 통해 약 45%정도 시간을 단축할 수 있었습니다.

### API naming 개선

- v1에서 API 설계는 다음과 같이 URL이 동사 + 명사 구조로 되어있는 사례가 있었습니다.
  ```
  	GET /users/getstoragesize
  	POST /users/uploadfiles
  ```
- API 디자인은 리소스 중심으로 구성해야하는데, 이를 완벽하게 어기고 있었습니다.
- 전체적으로 API 설계를 수정해서 다음과 같이 변경했습니다.
  ```
  	GET  /users/getstoragesize ->  GET  /user/volume
  	POST /users/uploadfiles    ->  POST /storage/file
  ```

### UI 개선

#### 배경

- 이전 버전에서 UI/UX를 분석했을때, 전체적으로 사용자가 느끼기에 직관성이 부족하고, 부자연스러웠습니다.
- 버튼을 예로 들면, 서비스 내 모든 버튼이 단순히 텍스트이기 때문에 버튼이라는 인식을 주기 어려웠습니다.
- 또 다른 예로, 파일 리스트를 봤을때, 해당 파일이 폴더인지, 파일인지 한 눈에 들어오지 않았습니다.
- 이런 문제들은 서비스의 초기 랜더링 속도같은 성능적인 부분이 잘 최적화 되어 있더라도, 서비스 이용률을 낮추는 요인이 될 수 있기 때문에 UI/UX 개선은 꼭 필요하다고 생각했습니다.

#### 문제해결

<div>
	<img src="https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/NasServerV2/%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AF%E1%84%89%E1%85%A5%E1%86%AB%E1%84%90%E1%85%A2%E1%86%A8.png"  height="240px"/>
	<img src="https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/NasServerV2/%E1%84%86%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AB.png"  height="240px"/>
</div>

- V1의 경우 파일 추가를 어떻게 해야할지 한 눈에 파악할 수 없었습니다.
  - 우측 상단에 파일 및 폴더 추가 아이콘을 표시해서 기능에 대한 접근성을 높였습니다.
- V1에서는 파일 및 폴더를 다운로드, 이름 변경, 삭제 등 어떤 작업을 할 때, 반응형 웹에서 사용자의 편의성을 고려하지 않았습니다.
  - 데스크탑 환경에서는 `onHover`로 버튼에 접근할 수 있게 하고, 모바일 환경에서는 "더 보기" 아이콘을 통해 버튼에 접근할 수 있게 했습니다.

<div>
	<img src="https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/nasServer/%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB/%E1%84%85%E1%85%A9%E1%84%80%E1%85%B3%E1%84%8B%E1%85%B5%E1%86%AB.png"  height="240px"/>
	<img src="https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/nasServer/%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB/%E1%84%92%E1%85%AC%E1%84%8B%E1%85%AF%E1%86%AB%E1%84%80%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%B8.png"  height="240px"/>
	<img src="https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/NasServerV2/%E1%84%85%E1%85%A9%E1%84%80%E1%85%B3%E1%84%8B%E1%85%B5%E1%86%AB.png"  height="240px"/>
	<img src="https://s3.ap-northeast-2.amazonaws.com/ikiningyou.portfolio.s3.bucket/Images/NasServerV2/%E1%84%92%E1%85%AC%E1%84%8B%E1%85%AF%E1%86%AB%E1%84%80%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%B8.png"  height="240px"/>
</div>

- 사용자의 이름을 입력할 때, 성 + 이름을 입력값으로 받는 것은 본명 대신 닉네임으로 이름을 입력하는 사람에게는 입력하기 애매한 경우가 있었습니다.
  - 성 + 이름을 이름으로 대체해서 자유롭게 이름을 입력할 수 있게 변경했습니다.
- 사용자 아이콘은 UX 적으로 쉽게 사용자를 구별할 수 있는 요소인데, V1에서는 사용자 아이콘을 등록하지 않았습니다.
  - 사용자 아이콘을 회원가입할 때, 설정할 수 있게 변경했습니다.
  - 로그인 후에 사용자 아이콘으로 현재 로그인한 아이디를 쉽게 확인할 수 있게 변경되었습니다.
