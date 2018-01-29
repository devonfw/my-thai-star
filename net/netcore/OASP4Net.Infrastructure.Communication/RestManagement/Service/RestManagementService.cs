using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace OASP4Net.Infrastructure.Communication.RestManagement.Service
{
    public class RestManagementService : IRestManagementService
    {
        private Dictionary<string, string> RequestHeaderDictionary { get; set; }

        public RestManagementService(Dictionary<string, string> requestHeader = null)
        {
            RequestHeaderDictionary = requestHeader ?? new Dictionary<string, string>();
        }

        #region API methods

        public async Task<string> CallGetMethod(string url)
        {
            try
            {
                using (var httpClient = GetDefaultClient())
                {
                    var response = await httpClient.GetAsync(url);
                    response.EnsureSuccessStatusCode();
                    httpClient.Dispose();
                    return await response.Content.ReadAsStringAsync();
                    }
            }
            catch (Exception ex)
            {
                var msg = $"{ex.Message} : {ex.InnerException}";
                Console.WriteLine(msg);
                throw new Exception(msg);
            }
        }

        public async Task<Stream> CallGetMethodAsStream(string url)
        {
            try
            {
                using (var httpClient = GetDefaultClient())
                {
                    var response = await httpClient.GetAsync(url);
                    response.EnsureSuccessStatusCode();
                    httpClient.Dispose();
                    return await response.Content.ReadAsStreamAsync();
                }
            }
            catch (Exception ex)
            {
                var msg = $"{ex.Message} : {ex.InnerException}";
                Console.WriteLine(msg);
                throw new Exception(msg);
            }
        }

        public async Task<string> CallPostMethod<T>(string url, T dataToSend)
        {
            var responseMessage = new HttpResponseMessage();
            var message = string.Empty;
            try
            {
                using (var httpClient = GetDefaultClient())
                {
                    var httpConent = GetByteArrayContentFromObject(dataToSend);
                    try
                    {
                        responseMessage = await httpClient.PostAsync(url, httpConent);
                    }
                    catch (Exception ex)
                    {
                        if (responseMessage != null)
                        {
                            responseMessage.StatusCode = HttpStatusCode.InternalServerError;
                            responseMessage.ReasonPhrase = $"RestHttpClient.SendRequest failed: {ex}";
                        }
                    }

                    httpConent.Dispose();
                }

                if (responseMessage != null)
                {
                    message = await responseMessage.Content.ReadAsStringAsync();
                }
            }
            catch (Exception ex)
            {
                var msg = $"{ex.Message} : {ex.InnerException}";
                Console.WriteLine(msg);
                throw new Exception(msg);
            }

            return message;
        }

        public async Task<string> CallPutMethod<T>(string url, T dataToSend)
        {
            var responseMessage = new HttpResponseMessage();
            var message = string.Empty;
            try
            {
                using (var httpClient = GetDefaultClient())
                {
                    var httpConent = GetByteArrayContentFromObject(dataToSend);
                    try
                    {
                        responseMessage = await httpClient.PutAsync(url, httpConent);
                    }
                    catch (Exception ex)
                    {
                        if (responseMessage != null)
                        {
                            responseMessage.StatusCode = HttpStatusCode.InternalServerError;
                            responseMessage.ReasonPhrase = $"RestHttpClient.SendRequest failed: {ex}";
                        }
                    }

                    httpConent.Dispose();
                }

                if (responseMessage != null)
                {
                    message = await responseMessage.Content.ReadAsStringAsync();
                }
            }
            catch (Exception ex)
            {
                var msg = $"{ex.Message} : {ex.InnerException}";
                Console.WriteLine(msg);
                throw new Exception(msg);
            }

            return message;
        }

        #endregion

        #region private methods

        internal StringContent GetByteArrayContentFromObject<T>(T objectToSend)
        {
            var myContent = JsonConvert.SerializeObject(objectToSend);
            var content = new StringContent(myContent, Encoding.UTF8, "application/json");
            return content;
        }

        private HttpClient GetDefaultClient()
        {
            //uncommento in order to accept zipped content
            //HttpClientHandler handler = new HttpClientHandler{AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate};
            var handler = new HttpClientHandler { UseCookies = false };
            var client = new HttpClient(handler) {Timeout = TimeSpan.FromSeconds(600) };
            const string userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36";
            client.DefaultRequestHeaders.Add("User-Agent", userAgent);
            client.DefaultRequestHeaders.Add("Accept", "application/json, text/plain, */*");

            foreach (var header in RequestHeaderDictionary)
            {
                client.DefaultRequestHeaders.Add(header.Key, header.Value);
            }

            return client;
        }



        #endregion

    }
}
